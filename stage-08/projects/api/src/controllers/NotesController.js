import { connection as knex } from '../database/knex/index.js';

export class NotesController {
  async create(req, res) {
    const { title, description, tags, links } = req.body;
    const { user_id } = req.params;

    const [note_id] = await knex('notes').insert({
      title,
      description,
      user_id,
    });

    const linksToInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    await knex('links').insert(linksToInsert);

    const tagsToInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex('tags').insert(tagsToInsert);

    res.status(201).json();
  }

  async show(req, res) {
    const { id } = req.params;

    const note = await knex('notes').where({ id }).first();
    const tags = await knex('tags').where({ note_id: id }).orderBy('name');
    const links = await knex('links')
      .where({ note_id: id })
      .orderBy('created_at');

    res.status(200).json({
      ...note,
      tags,
      links,
    });
  }
}
