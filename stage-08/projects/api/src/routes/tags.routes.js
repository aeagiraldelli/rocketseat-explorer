import { Router } from 'express';
import { TagsController } from '../controllers/TagsController.js';

const tagsController = new TagsController();
export const tagsRoutes = Router();

tagsRoutes.get('/:user_id', tagsController.show);
