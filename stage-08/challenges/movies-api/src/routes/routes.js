import { Router } from 'express';
import { userRoutes } from './user.routes.js';
import { movieNotesRoutes } from './movienotes.routes.js';
import { movieTagsRoutes } from './movietags.routes.js';

export const routes = Router();

routes.use('/users', userRoutes);
routes.use('/movienotes', movieNotesRoutes);
routes.use('/movietags', movieTagsRoutes);
