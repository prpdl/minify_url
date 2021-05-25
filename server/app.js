import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors'

import usersRouter from './routes/users';
import urlRouter from './routes/url'

const app = express();

app.use(cors());
app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/users', usersRouter) // Writing Json File (First Task)
app.use('/api/url', urlRouter);

export default app;