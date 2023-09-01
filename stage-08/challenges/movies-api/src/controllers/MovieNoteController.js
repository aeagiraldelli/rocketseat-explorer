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

  /** @type {import('express').RequestHandler} */
  async show(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new AppError('ID da nota não informado.');
    }

    const note = await db('movie_notes').where({ id }).first();
    if (!note) {
      throw new AppError('Nota do filme não encontrada.');
    }

    const tags = await db('movie_tags').where({ note_id: id });

    res.status(200).json({
      ...note,
      tags,
    });
  }

  /** @type {import('express').RequestHandler} */
  async list(req, res) {
    const { user_id } = req.query;

    if (!user_id) {
      throw new AppError('ID do usuário não informado.');
    }

    const notes = await db('movie_notes').where({ user_id });

    const fullNotes = await Promise.all(
      notes.map(async (note) => {
        const tags = await db('movie_tags').where({ note_id: note.id });
        console.log('note:', note, 'tags:', tags);
        return {
          ...note,
          tags,
        };
      })
    );
    console.log('fullNotes:', fullNotes);

    return res.status(200).json(fullNotes);
  }
}
