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

  /** @type {import('express').RequestHandler} */
  async update(req, res) {
    const { id } = req.params;
    const { name, email, password, oldPassword } = req.body;

    if (!id) {
      throw new AppError('ID do usuário não informado.');
    }

    const user = await db('users').where({ id }).first();
    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    if (email) {
      const registeredUser = await db('users').where({ email }).first();
      if (registeredUser && registeredUser.id !== user.id) {
        throw new AppError('E-mail já está sendo utilizado por outro usuário.');
      }
    }

    user.email = email ?? user.email;
    user.name = name ?? user.name;

    if (password && !oldPassword) {
      throw new AppError(
        'Você precisa informar a senha antiga para poder definir uma nova senha'
      );
    }

    if (password && oldPassword) {
      const passOk = await bcrypt.compare(password, oldPassword);
      if (!passOk) {
        throw new AppError('Senha antiga inválida');
      }

      user.password = await bcrypt.hash(password, 8);
    }

    await db('users').where({ id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: db.fn.now(),
    });

    return res.status(200).json();
  }
}
