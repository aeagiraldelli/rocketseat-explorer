import { AppError } from '../utils/AppError.js';
import db from '../database/knex/db.js';
import bcrypt from 'bcryptjs';

export class UserController {
  /** @type {import("express").RequestHandler} */
  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      throw new AppError('Nome é obrigatório.');
    }

    if (!email) {
      throw new AppError('E-mail é obrigatório.');
    }

    if (!password) {
      throw new AppError('Password é obrigatório.');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    try {
      const [user_id] = await db('users').insert({
        name: name,
        email: email,
        password: hashedPassword,
      });
    } catch {
      throw new AppError(
        'Erro ao salvar os dados do usuário. Verifique se a conta não foi criada e tente novamente',
        500
      );
    }

    return res.status(201).json();
  }
}
