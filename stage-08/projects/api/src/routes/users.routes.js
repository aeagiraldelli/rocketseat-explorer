import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { ensureAuthenticaded } from '../middlewares/ensureAuthenticaded.js';

export const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', (req, res) => {
  const { page, limit } = req.query;
  res.send(`<h1>Page requested: ${page}</h1><h2>Limit: ${limit}</h2>`);
});

userRoutes.post('/', userController.create);
userRoutes.put('/', ensureAuthenticaded, userController.update);
