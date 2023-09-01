import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

export const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/', userController.create);
userRoutes.put('/:id', userController.update);
