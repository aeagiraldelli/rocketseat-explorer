import { connection as knex } from '../database/knex/index.js';
import { AppError } from '../utils/AppError.js';

export class TagsController {
  /** @type {import('express').RequestHandler} */
  async show(req, res) {
    const user_id = req.user.id;
    const tags = await knex('tags').where({ user_id }).orderBy('name');
    return res.json(tags);
  }
}
