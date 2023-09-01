import { Router } from 'express';
import { NotesController } from '../controllers/NotesController.js';

export const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.post('/:user_id', notesController.create);
notesRoutes.get('/:id', notesController.show);
notesRoutes.delete('/:id', notesController.delete);
notesRoutes.get('/', notesController.list);
