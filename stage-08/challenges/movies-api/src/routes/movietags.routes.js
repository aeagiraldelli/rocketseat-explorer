import { Router } from 'express';
import { MovieTagsController } from '../controllers/MovieTagsController.js';

const movieTagsController = new MovieTagsController();
export const movieTagsRoutes = Router();

movieTagsRoutes.use('/:user_id', movieTagsController.show);
