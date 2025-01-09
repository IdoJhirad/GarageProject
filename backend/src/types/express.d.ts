// src/types/express.d.ts
import { IUser } from '../db/user.model';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}

export {};
