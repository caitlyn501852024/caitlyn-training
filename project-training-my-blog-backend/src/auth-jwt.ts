import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

interface MyJwtPayload extends JwtPayload {
  id: number;
  account: string;
  iat?: number;
  exp?: number;
}

export function authJwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; // 拆出 'Bearer 後面的 token'

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token' });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_KEY!) as MyJwtPayload;
      (req as Request & { myJwt: MyJwtPayload }).myJwt = payload;
      // console.log('payload:', payload);
      // console.log('myJwt:', req.myJwt); // 會爆炸
      next();
    } catch (err) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
  } else {
    return res.status(403).json({ success: false, error: '未登入或無效的會員' });
  }
  // next();
}
