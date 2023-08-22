import { AppError } from '../utils/AppError.js';
import { databaseConnection } from '../database/sqlite/database.js';

export class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      throw new AppError('Nome é obrigatório.');
    }

    if (!password) {
      throw new AppError('Senha é obrigatório.');
    }

    if (!email) {
      throw new AppError('Email é obrigatório.');
    }

    const db = await databaseConnection();
    const query = 'SELECT * FROM users WHERE email = (?)';
    const userExists = await db.get(query, [email]);

    if (userExists) {
      throw new AppError('Este email já está sendo utilizado!');
    }

    const cmd = `INSERT INTO users 
                 (name, email, password)
                 VALUES
                 (?, ?, ?)`;

    try {
      await db.run(cmd, [name, email, password]);
    } catch (error) {
      throw new AppError('Erro ao cadastrar novo usuário.', 500);
    }

    return res.status(201).json({});
  }
}
