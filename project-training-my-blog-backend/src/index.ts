import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import z from 'zod';

const app = express();
const prisma = new PrismaClient();

//* top-level middlewares
// 註冊的驗證 schema
const registerSchema = z.object({
  account: z.string().min(4, '帳號需為 4 碼以上的英數字'),
  password: z.string().min(6, '密碼需 6 碼以上，需包含至少一個英文與數字'),
});

// 跨域
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

dotenv.config();

app.use((req, res, next) => next());
app.use(cors(corsOptions));
app.use(cookieParser());

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

//********** 註冊（POST '/api/register'）
app.post('/api/register', async (req, res) => {
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

//********** 登入（POST '/api/login'）
app.post('/api/login', async (req, res) => {
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
    return res.status(401).json(output);
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
    return res.status(410).json(output);
  }

  const isPasswordValid = await bcrypt.compare(password, member.password_hash);
  if (!isPasswordValid) {
    output.code = 420;
    output.error = '帳號或密碼錯誤！';
    return res.status(420).json(output);
  }

  // 密碼正確，產生 JWT
  output.success = true;
  const jwtKey = process.env.JWT_KEY;
  if (!jwtKey) {
    output.code = 510;
    output.error = 'JWT 密鑰未設定！';
    return res.status(510).json(output);
  }
  const token = jwt.sign(
    {
      id: member.id,
      account: member.account,
    },
    jwtKey,
    {
      expiresIn: '7d',
    }
  );

  // res.cookie('My_blog_token', token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 天
  //   sameSite: 'lax',
  //   path: '/',
  // });

  output.data = {
    token,
    id: member.id,
    account: member.account,
    nickname: member.nickname,
    avatar_url: member.avatar_url,
  };
  return res.json(output);
});

// //********** 登出（POST '/api/logout'）
// app.post('/api/logout', async (req, res) => {
//   res.clearCookie('My_blog_token', {
//     httpOnly: true,
//     secure: false,
//     sameSite: 'lax',
//     domain: 'localhost',
//     path: '/',
//   });
//
//   res.json({ success: true, message: '登出成功！' });
// });
//
// //********** 取得當前登入的使用者資料（GET '/api/me'）
// app.get('/api/me', async (req, res) => {
//   const token = req.cookies?.My_blog_token;
//   if (!token) return res.status(401).json({ error: 'No token' });
//
//   try {
//     const jwtKey = process.env.JWT_KEY;
//     if (!jwtKey) throw new Error('JWT_KEY 未設定！');
//
//     const payload = jwt.verify(token, jwtKey) as { id: number };
//     const user = await prisma.members.findUnique({
//       where: {
//         id: payload.id,
//       },
//       select: {
//         id: true,
//         account: true,
//         nickname: true,
//         avatar_url: true,
//       },
//     });
//
//     if (!user) return res.status(404).json({ error: '沒有這名會員' });
//
//     return res.json(user);
//   } catch (err) {
//     res.status(401).json({ error: err });
//   }
// });

//********** 單篇文章資料（GET '/api/posts/:id'）
app.get('/api/posts/:id', async (req, res) => {
  try {
    const id = +req.params.id;
    if (!id) {
      return res.status(441).json('文章編號錯誤！');
    }
    const article = await prisma.articles.findUnique({
      where: {
        id: id,
      },
      include: {
        article_imgs: true,
        members: {
          select: {
            id: true,
            account: true,
            nickname: true,
            avatar_url: true,
          },
        },
        topics: true,
        comments: {
          include: {
            members: {
              select: {
                id: true,
                account: true,
                nickname: true,
                avatar_url: true,
              },
            },
          },
        },
      },
    });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err });
  }
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
