import { Router } from 'express';
import { MovieNotesController } from '../controllers/MovieNoteController.js';

const movieNotesController = new MovieNotesController();
export const movieNotesRoutes = Router();

movieNotesRoutes.post('/:user_id', movieNotesController.create);
