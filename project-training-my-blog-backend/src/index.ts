import type { Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

import { authJwtMiddleware } from './auth-jwt.js';

import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import z from 'zod';
import path from 'path';
import multer from 'multer';
import { JSDOM } from 'jsdom';

interface MyJwtPayload extends JwtPayload {
  id: number;
  account: string;
}

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

// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//********** 首頁資料：上方主題 nav、最新的 9 筆文章、最新的 4 筆留言 (GET '/api')
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
        take: 4,
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
    console.error(err);

    res
      .status(500)
      .json({ status: 'success', message: '伺服器錯誤！', code: 500 });
  }
});

//********** 註冊（POST '/api/register'）
app.post('/api/register', async (req, res) => {
  const { account, password } = req.body;
  const checkRegisterResult = registerSchema.safeParse({ account, password });

  // zod 驗證失敗
  if (!checkRegisterResult.success) {
    return res.status(400).json({
      status: 'error',
      message: checkRegisterResult.error.issues,
      code: 400,
    });
  }

  try {
    // 已經註冊過的帳號
    const member = await prisma.members.findUnique({
      where: {
        account: account,
      },
    });
    if (member) {
      return res
        .status(409)
        .json({ status: 'error', message: '此帳號已經被註冊！', code: 409 });
    }
    await prisma.members.create({
      data: {
        account: account,
        password_hash: await bcrypt.hash(password, 10),
      },
    });
    return res
      .status(201)
      .json({ status: 'success', message: '註冊成功！', code: 201 });
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .json({ status: 'error', message: '伺服器錯誤！', code: 500 });
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

  // 帳號或密碼錯誤
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
    output.code = 401;
    output.error = '帳號或密碼錯誤！';
    return res.status(401).json(output);
  }

  const isPasswordValid = await bcrypt.compare(password, member.password_hash);
  if (!isPasswordValid) {
    output.code = 401;
    output.error = '帳號或密碼錯誤！';
    return res.status(401).json(output);
  }

  // 密碼正確，產生 JWT
  output.success = true;
  const jwtKey = process.env.JWT_KEY;
  if (!jwtKey) {
    output.code = 500;
    output.error = 'JWT 密鑰未設定！';
    return res.status(500).json(output);
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

//********** 登出（POST '/api/logout'）
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
//********** 取得當前登入的使用者資料（GET '/api/me'）
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

//********** 會員中心資料（GET '/api/profile'）
app.get(
  '/api/profile',
  authJwtMiddleware,
  async (req: Request & { myJwt?: MyJwtPayload }, res: Response) => {
    const id = req.myJwt?.id || 0;
    if (!id) {
      return res
        .status(401)
        .json({ status: 'error', message: '未登入或會員編號錯誤', code: 401 });
    }

    try {
      // 文章的分頁
      const articlePage = parseInt(req.query.articlePage as string) || 1; // 目前頁數
      const articleLimit = parseInt(req.query.articleLimit as string) || 10; // 每頁顯示筆數
      const articleSkip = (articlePage - 1) * articleLimit;

      // 留言的分頁
      const commentPage = parseInt(req.query.commentPage as string) || 1; // 目前頁數
      const commentLimit = parseInt(req.query.commentLimit as string) || 10; // 每頁顯示筆數
      const commentSkip = (articlePage - 1) * articleLimit;

      // 篩選主題和搜尋
      const topics =
        (req.query.topics as string)?.split(',').filter(Boolean) || [];
      const articleSearchTerm =
        (req.query.articleSearchTerm as string)?.trim() || '';
      const commentSearchTerm =
        (req.query.commentSearchTerm as string)?.trim() || '';

      // 文章 where 條件
      const articleWhere: any = {
        member_id: id,
      };
      if (topics.length > 0) {
        articleWhere.topics = {
          topic_name: { in: topics },
        };
      }

      if (articleSearchTerm) {
        articleWhere.OR = [
          { title: { contains: articleSearchTerm, mode: 'insensitive' } },
          { content: { contains: articleSearchTerm, mode: 'insensitive' } },
        ];
      }

      // 留言 where 條件
      const commentWhere: any = {
        member_id: id,
      };
      if (commentSearchTerm) {
        commentWhere.OR = [
          { content: { contains: commentSearchTerm, mode: 'insensitive' } },
          {
            articles: {
              title: { contains: commentSearchTerm, mode: 'insensitive' },
            },
          },
        ];
      }

      // 會員資料
      const memberData = await prisma.members.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          account: true,
          nickname: true,
          avatar_url: true,
          created_at: true,
        },
      });

      if (!memberData) {
        return res.status(404).json({ status: 'error', message: '無此會員！' });
      }

      // 會員的文章（含篩選、搜尋、分頁）
      const totalArticles = await prisma.articles.count({
        where: articleWhere,
      });

      const articles = await prisma.articles.findMany({
        skip: articleSkip,
        take: articleLimit,
        where: articleWhere,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          title: true,
          content: true,
          created_at: true,
          updated_at: true,

          // join "topics"
          topics: {
            select: {
              id: true,
              topic_name: true,
            },
          },
          article_imgs: true,
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

      const articlesWithCount = articles.map((v) => ({
        ...v,
        commentCount: v._count.comments,
        _count: undefined,
      }));

      // 會員的留言
      const totalComments = await prisma.comments.count({
        where: commentWhere,
      });

      const comments = await prisma.comments.findMany({
        skip: commentSkip,
        take: commentLimit,
        where: commentWhere,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          content: true,
          article_id: true,
          created_at: true,

          // 留言對應的文章
          articles: {
            select: {
              id: true,
              title: true,
              members: {
                select: {
                  id: true,
                  account: true,
                  avatar_url: true,
                },
              },
              article_imgs: true,
            },
          },
        },
      });

      res.json({
        memberData,
        articles: {
          articleData: articlesWithCount,
          pagination: {
            totalCount: totalArticles,
            totalPages: Math.ceil(totalArticles / articleLimit),
            currentPage: articlePage,
            startItem: articleSkip + 1,
            endItem: Math.min(articleSkip + articleLimit, totalArticles),
          },
        },
        comments: {
          commentData: comments,
          pagination: {
            totalCount: totalComments,
            totalPages: Math.ceil(totalComments / commentLimit),
            currentPage: commentPage,
            startItem: commentSkip + 1,
            endItem: Math.min(commentSkip + commentLimit, totalComments),
          },
        },
      });
    } catch (err) {
      res
        .status(500)
        .json({ status: 'error', message: '伺服器錯誤！', code: 500 });
    }
  }
);

//********** 上傳會員大頭貼圖片（POST '/api/upload-avatar'）
// 使用 multer 處理圖片上傳
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const avatarUpload = multer({ storage: avatarStorage });

app.post(
  '/api/upload-avatar',
  authJwtMiddleware,
  avatarUpload.single('avatar'),
  async (req: (Request & { myJwt?: MyJwtPayload }) | any, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ status: 'error', message: '沒有上傳檔案！', code: 400 });
      }
      const filePath = `http://localhost:3001/${req.file.path.replace(/\\/g, '/')}`;

      // 更新會員資料
      const id = +req.myJwt?.id || 0;
      await prisma.members.update({
        where: {
          id: id,
        },
        data: {
          avatar_url: filePath,
        },
      });

      return res.status(200).json({
        status: 'success',
        message: '上傳成功！',
        code: 200,
        filePath,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: 'error', message: '伺服器錯誤', code: 500 });
    }
  }
);

//********** 上傳文章圖片（POST '/api/upload-article-img'）
// 使用 multer 處理圖片上傳
const articleImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/article-imgs');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const articleImgUpload = multer({ storage: articleImgStorage });

app.post(
  '/api/upload-article-img',
  articleImgUpload.single('file'),
  (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: 'error', message: '沒有上傳檔案！', code: 400 });
    }
    const filePath = `http://localhost:3001/${req.file.path.replace(/\\/g, '/')}`;
    return res
      .status(200)
      .json({ status: 'success', message: '上傳成功！', code: 200, filePath });
  }
);

//********** 新增文章（POST '/api/posts/new-post'）
const formParser = multer();

app.post(
  '/api/posts/new-post',
  authJwtMiddleware,
  formParser.none(),
  async (req: Request & { myJwt?: MyJwtPayload }, res) => {
    const id = req.myJwt?.id || 0;

    const { title, content, topic_id } = req.body;
    if (!title || !content || !topic_id) {
      return res
        .status(400)
        .json({ status: 'error', message: '資料錯誤！', code: 400 });
    }
    try {
      // 新增文章
      const newArticle = await prisma.articles.create({
        data: {
          title: title,
          content: content,
          topic_id: +topic_id,
          member_id: +id,
        },
      });

      const articleId = newArticle.id;

      // 處理文章中的圖片
      const dom = new JSDOM(content);
      const imgs = Array.from(dom.window.document.querySelectorAll('img'));

      for (const [i, img] of imgs.entries()) {
        const src = img.getAttribute('src');
        if (!src) continue;

        await prisma.article_imgs.create({
          data: {
            article_id: articleId,
            img_url: src, // 前端上傳圖片回傳的 filePath
            img_order: i + 1, // 第一張圖片為 1，依序增加
          },
        });
      }

      return res
        .status(201)
        .json({ status: 'success', message: '發表成功！', code: 201 });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ status: 'error', message: '伺服器錯誤！', code: 500 });
    }
  }
);

//********** 文章列表資料（GET '/api/posts'）
app.get('/api/posts', async (req, res) => {
  try {
    const allTopics = await prisma.topics.findMany({
      select: {
        topic_name: true,
      },
    });

    const page = parseInt(req.query.page as string) || 1; // 目前頁數
    const limit = parseInt(req.query.limit as string) || 10; // 每頁顯示筆數
    const skip = (page - 1) * limit;

    // query strings
    const topics =
      (req.query.topics as string)?.split(',').filter(Boolean) || [];
    const searchTerm = (req.query.searchTerm as string)?.trim() || '';

    // 根據 query string 加入 where 條件
    const where: any = {};
    if (topics.length > 0) {
      where.topics = {
        topic_name: { in: topics },
      };
    }

    if (searchTerm) {
      where.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { members: { account: { contains: searchTerm, mode: 'insensitive' } } },
      ];
    }

    // 查詢總筆數
    const totalCount = await prisma.articles.count({ where });

    // 查詢當前頁數的文章資料
    const articles = await prisma.articles.findMany({
      skip,
      take: limit,
      where,
      orderBy: {
        created_at: 'desc',
      },
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
    });

    // 總頁數
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      allTopics: allTopics,
      articles: articles,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        startItem: skip + 1,
        endItem: Math.min(skip + limit, totalCount),
      },
    });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ status: 'error', message: '伺服器錯誤！', code: 500 });
  }
});

//********** 單篇文章資料（GET '/api/posts/:id'）
app.get('/api/posts/:id', async (req, res) => {
  try {
    const id = +req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ status: 'error', message: '文章編號錯誤！', code: 400 });
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

    if (!article) {
      return res
        .status(404)
        .json({ status: 'error', message: '無此文章！', code: 404 });
    }

    const authorLatestPosts = await prisma.articles.findMany({
      where: {
        member_id: article.member_id,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 5,
      select: {
        id: true,
        title: true,
      },
    });

    const topicLatestPosts = await prisma.articles.findMany({
      where: {
        topic_id: article.topic_id,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 5,
      select: {
        id: true,
        title: true,
      },
    });

    res.json({
      ...article,
      authorLatestPosts: authorLatestPosts,
      topicLatestPosts: topicLatestPosts,
    });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ status: 'error', message: '伺服器錯誤！', code: 500 });
  }
});

//********** 編輯文章（PUT '/api/posts/edit/:id'）
app.put('/api/posts/edit/:id', async (req, res) => {
  try {
    const id = +req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ status: 'error', message: '文章編號錯誤！', code: 400 });
    }
    const { title, content, topic_id } = req.body;

    await prisma.articles.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
        topic_id: +topic_id,
        updated_at: new Date(),
      },
    });
    res
      .status(200)
      .json({ status: 'success', message: '修改成功！', code: 200 });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ status: 'error', message: '伺服器錯誤！', code: 500 });
  }
});

//********** 刪除單篇文章（DELETE '/api/posts/delete-post'）
app.delete('/api/posts/delete-post', async (req, res) => {
  const { article_id } = req.body;
  try {
    await prisma.articles.delete({
      where: {
        id: +article_id,
      },
    });
    return res
      .status(200)
      .json({ status: 'success', message: '刪除文章成功！', code: 200 });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ status: 'error', message: '伺服器錯誤！', code: 500 });
  }
});

//********** 新增留言（POST '/api/posts/new-comment'）
app.post(
  '/api/posts/new-comment',
  authJwtMiddleware,
  async (req: Request & { myJwt?: MyJwtPayload }, res) => {
    const id = req.myJwt?.id || 0;

    const { content, article_id } = req.body;
    try {
      await prisma.comments.create({
        data: {
          content: content,
          member_id: +id,
          article_id: +article_id,
        },
      });
      return res
        .status(201)
        .json({ status: 'success', message: '留言成功！', code: 201 });
    } catch (err) {
      console.error(err);

      res
        .status(500)
        .json({ status: 'error', message: '伺服器錯誤！', code: 500 });
    }
  }
);

//********** 刪除留言（DELETE '/api/posts/delete-comment'）
app.delete('/api/posts/delete-comment', async (req, res) => {
  const { comment_id } = req.body;
  try {
    await prisma.comments.delete({
      where: {
        id: +comment_id,
      },
    });
    return res
      .status(200)
      .json({ status: 'success', message: '刪除成功！', code: 200 });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ status: 'error', message: '伺服器錯誤！', code: 500 });
  }
});

//********** 拿主題列表（GET '/api/topics'）
app.get('/api/topics', async (req, res) => {
  try {
    const topics = await prisma.topics.findMany();
    res.json(topics);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ status: 'error', message: '伺服器錯誤！', code: 500 });
  }
});

//********** 靜態資料夾
app.use('/uploads', express.static('uploads'));

//********** 404
app.use((req, res) => {
  res.status(404).send('Not Found!');
});

//********** 監聽通訊埠
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
