import { Router } from 'express';
import { userRoutes } from './users.routes.js';
import { notesRoutes } from './notes.routes.js';
import { tagsRoutes } from './tags.routes.js';

export const router = Router();

router.use('/users', userRoutes);
router.use('/notes', notesRoutes);
router.use('/tags', tagsRoutes);
