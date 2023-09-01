import { Router } from 'express';
import { MovieNotesController } from '../controllers/MovieNoteController.js';

const movieNotesController = new MovieNotesController();
export const movieNotesRoutes = Router();

movieNotesRoutes.get('/', movieNotesController.list);
movieNotesRoutes.get('/:id', movieNotesController.show);
movieNotesRoutes.post('/:user_id', movieNotesController.create);
movieNotesRoutes.delete('/:note_id', movieNotesController.delete);
