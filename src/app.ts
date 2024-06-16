// src/index.ts
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import usersRoutes from './routes/users.routes';
import reviewRoutes from './routes/reviews.routes';
import studentRoutes from './routes/student.routes';
import mentorRoutes from './routes/mentors.routes';
import loginRoutes from './routes/login.routes';
const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World'
  });
});
app.use('/users', usersRoutes);
app.use('/reviews', reviewRoutes);
app.use('/students', studentRoutes);
app.use('/mentors', mentorRoutes);
app.use('/login', loginRoutes);

module.exports = {app};