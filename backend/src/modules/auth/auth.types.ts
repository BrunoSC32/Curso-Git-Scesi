export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

export interface UserPublic {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user: UserPublic;
}
