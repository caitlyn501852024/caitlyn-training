import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import z from 'zod';

const app = express();
const prisma = new PrismaClient();

// 註冊的驗證 schema
const registerSchema = z.object({
  account: z.string().min(4, '帳號需為 4 碼以上的英數字'),
  password: z.string().min(6, '密碼需 6 碼以上，需包含至少一個英文與數字'),
});

//* top-level middlewares
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

dotenv.config();

app.use((req, res, next) => next());
app.use(cors(corsOptions));

//********** 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//********** 首頁資料：上方主題 nav、最新的 9 筆文章、最新的 8 筆留言 (GET '/api')
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

//********** 註冊（POST '/register/api'）
app.post('/register/api', async (req, res) => {
  const { account, password } = req.body;
  const checkRegisterResult = registerSchema.safeParse({ account, password });

  // zod 驗證失敗
  if (!checkRegisterResult.success) {
    return res.status(400).json({ errors: checkRegisterResult.error.issues });
  }

  try {
    // 已經註冊過的帳號
    const member = await prisma.members.findUnique({
      where: {
        account: account,
      },
    });
    if (member) {
      return res.status(409).json({ error: '此帳號已經被註冊！' });
    }
    await prisma.members.create({
      data: {
        account: account,
        password_hash: await bcrypt.hash(password, 10),
      },
    });
    return res.status(201).json({ success: true, message: '註冊成功！' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//********** 登入（POST '/login/api'）
app.post('/login/api', async (req, res) => {
  const output = {
    success: false,
    code: 0,
    error: '',
    bodyData: req.body,
    data: {},
  };
  const { account, password } = req.body;

  // 帳號或密碼有沒填的
  if (!account || !password) {
    output.error = '請輸入帳號和密碼！';
    return res.json(output);
  }

  // 沒有這個帳號
  const member = await prisma.members.findUnique({
    where: {
      account: account,
    },
    select: {
      id: true,
      account: true,
      nickname: true,
      avatar_url: true,
      password_hash: true,
    },
  });
  if (!member) {
    output.code = 410;
    output.error = '帳號或密碼錯誤！';
    return res.json(output);
  }

  const isPasswordValid = await bcrypt.compare(password, member.password_hash);
  if (!isPasswordValid) {
    output.code = 420;
    output.error = '帳號或密碼錯誤！';
    return res.json(output);
  }

  // 密碼正確，產生 JWT
  output.success = true;
  const jwtKey = process.env.JWT_KEY;
  if (!jwtKey) {
    output.code = 510;
    output.error = 'JWT 密鑰未設定！';
    return res.json(output);
  }
  const token = jwt.sign(
    {
      id: member.id,
      account: member.account,
    },
    jwtKey,
    {
      expiresIn: '30d',
    }
  );
  output.data = {
    token,
    account: member.account,
    nickname: member.nickname,
    avatar_url: member.avatar_url,
  };
  return res.json(output);
});

//********** 404
app.use((req, res) => {
  res.status(404).send('Not Found!');
});

//********** 監聽通訊埠
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
