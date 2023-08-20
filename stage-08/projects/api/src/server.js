import 'express-async-errors';
import express from 'express';

import { router } from './routes/routes.js';
import { AppError } from './utils/AppError.js';
import { databaseConnection } from './database/sqlite/database.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandling);

databaseConnection();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

function errorHandling(error, req, res, next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
