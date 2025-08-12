import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export function authJwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 拆出 'Bearer token'

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token' });
  }

  try {
    const jwtKey = process.env.JWT_KEY || '';
    const decoded = jwt.verify(token, jwtKey);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, error: 'Unauthorized' });
  }
  console.log('authJwt middleware imported');
  next();
}
