import { AppError } from '../utils/AppError.js';

export class UserController {
  create(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      throw new AppError('parameter "name" is required.');
    }

    res.status(201).json({ name, email });
  }
}
