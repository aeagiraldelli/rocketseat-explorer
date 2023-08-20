import { Router } from 'express';
import { userRoutes } from './users.routes.js';

export const router = Router();

router.use('/users', userRoutes);
