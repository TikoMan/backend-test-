import express from 'express';
import morgan from 'morgan';
import path from 'path';
import HttpError from 'http-errors';
import indexRouter from './routes/index.js';
import cors from './middlewares/cors.js';
import errorHandler from './middlewares/errorHandler.js';

const { NODE_HOST, NODE_PORT } = process.env;

const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve('public')));

app.use(indexRouter);

app.use((req, res, next) => {
  next(HttpError(404));
});

app.use(errorHandler);

app.listen(NODE_PORT, NODE_HOST, () => {
  // eslint-disable-next-line no-console
  console.log('Server started...');
});
