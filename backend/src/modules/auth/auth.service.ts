import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { User, UserPublic, UserRole } from './auth.types';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

export async function initializeUsersFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
  }
}

async function getAllUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function toPublicUser(user: User): UserPublic {
  const { password, ...publicUser } = user;
  return publicUser;
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
  role: UserRole = 'user',
): Promise<UserPublic> {
  const users = await getAllUsers();

  const emailExists = users.some((u) => u.email === email);
  if (emailExists) {
    throw new Error('El email ya está registrado');
  }

  const usernameExists = users.some((u) => u.username === username);
  if (usernameExists) {
    throw new Error('El nombre de usuario ya está en uso');
  }

  const newUser: User = {
    id: uuidv4(),
    username,
    email,
    password,
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

  return toPublicUser(newUser);
}

export async function loginUser(
  email: string,
  password: string,
): Promise<UserPublic> {
  const users = await getAllUsers();

  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  if (user.password !== password) {
    throw new Error('Credenciales inválidas');
  }

  return toPublicUser(user);
}
