import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import postsRouter from './routes/posts.ts';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// top-level middlewares
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use((req, res, next) => next());
app.use(cors(corsOptions));

// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/posts', postsRouter);

// 404
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// 監聽通訊埠
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
