import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export function authJwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.get('authorization');
  if (authHeader && authHeader.indexOf('Bearer ') === 0) {
    const token = authHeader && authHeader.split(' ')[1]; // 拆出 'Bearer token'

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY!);

      if (typeof decoded === 'string') {
        return res
          .status(401)
          .json({ success: false, message: 'No token verified' });
      }

      (req as Request & { user: JwtPayload }).user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
  }
}
