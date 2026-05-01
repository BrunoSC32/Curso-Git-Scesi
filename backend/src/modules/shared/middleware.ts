import { Request} from 'express';


export interface AuthRequest extends Request {
  userId?: string;
  userRole?: 'admin' | 'user';
  token?: string;
}