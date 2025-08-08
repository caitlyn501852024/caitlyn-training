import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient();

//* top-level middlewares
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

dotenv.config();

app.use((req, res, next) => next());
app.use(cors(corsOptions));

//* 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* 首頁資料：最新的 9 筆文章、最新的 8 筆留言 (GET '/api')
app.get('/api', async (req, res) => {
  try {
    const [topics, posts, comments] = await Promise.all([
      prisma.topics.findMany(),
      prisma.articles.findMany({
        orderBy: { created_at: 'desc' },
        take: 9,
        include: {
          topics: {
            select: {
              topic_name: true,
            },
          },
          members: {
            select: {
              account: true,
              nickname: true,
              avatar_url: true,
            },
          },
          article_imgs: {
            where: {
              img_order: 1,
            },
            select: {
              img_url: true,
              img_order: true,
            },
          },
        },
      }),
      prisma.comments.findMany({
        orderBy: { created_at: 'desc' },
        take: 8,
        include: {
          members: {
            select: {
              account: true,
              nickname: true,
              avatar_url: true,
            },
          },
          articles: {
            select: {
              id: true,
              title: true,
              article_imgs: {
                select: {
                  img_url: true,
                  img_order: true,
                },
              },
              members: {
                select: {
                  account: true,
                  nickname: true,
                  avatar_url: true,
                },
              },
            },
          },
        },
      }),
    ]);
    res.json({ topics, posts, comments });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//* 登入（POST '/login'）
app.post('/login', async (req, res) => {
  const output = {
    success: false,
    code: 0,
    error: '',
    bodyData: req.body,
    data: {},
  };
  let { account, password } = req.body;

  // 帳號或密碼有沒填的
  if (!account || !password) {
    output.error = '請輸入帳號和密碼！';
    return res.json(output);
  }

  // 沒有這個帳號
  const rows = await prisma.members.findMany({
    where: {
      account: account,
    },
  });
  if (!rows.length) {
    output.code = 410;
    output.error = '帳號或密碼錯誤！';
    return res.json(output);
  }

  //TODO: 密碼錯誤
  const password_hash = await prisma.members.findUnique({
    select: {
      password_hash: true,
    },
    where: {
      account: account,
    },
  });
});

//* 404
app.use((req, res) => {
  res.status(404).send('Not Found!');
});

//* 監聽通訊埠
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
