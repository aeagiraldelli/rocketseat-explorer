import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { routes } from './routes/routes.js';
import { AppError } from './utils/AppError.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors())
app.use(routes);
app.use(errorHandling);

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
    message: 'Internal server error',
  });
}
