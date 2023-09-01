import db from '../database/knex/db.js';
import { AppError } from '../utils/AppError.js';

export class MovieTagsController {
  /** @type {import('express').RequestHandler} */
  async show(req, res) {
    const { user_id } = req.params;
    if (!user_id) {
      throw new AppError('ID do usuário não foi informado.');
    }

    const user = await db('users').where({ id: user_id }).first();
    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const tags = await db('movie_tags').where({ user_id });

    return res.status(200).json(tags);
  }
}
