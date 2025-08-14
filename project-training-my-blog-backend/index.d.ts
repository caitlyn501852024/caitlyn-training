import 'express';
import type { JwtPayload } from 'jsonwebtoken';

export interface MyJwtPayload extends JwtPayload {
  id: number;
  account: string;
}

declare global {
  namespace Express {
    export interface Request {
      myJwt: MyJwtPayload;
    }
  }
}
