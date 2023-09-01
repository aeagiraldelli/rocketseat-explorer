import db from '../database/knex/db.js';
import { AppError } from '../utils/AppError.js';

export class MovieNotesController {
  /** @type {import('express').RequestHandler} */
  async create(req, res) {
    const { user_id } = req.params;
    const { title, description, rating, tags } = req.body;

    if (!user_id) {
      throw new AppError('ID do usuário não foi informado.');
    }

    if (rating && (rating < 1 || rating > 5)) {
      throw new AppError('Rating deve ser um valor de 1 até 5.');
    }

    const user = await db('users').where({ id: user_id }).first();
    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const [note_id] = await db('movie_notes').insert({
      title,
      description,
      rating,
      user_id,
    });

    if (tags) {
      const tagsToSave = tags.map((name) => {
        return {
          name,
          note_id,
          user_id,
        };
      });

      await db('movie_tags').insert(tagsToSave);
    }

    return res.status(200).json();
  }
}