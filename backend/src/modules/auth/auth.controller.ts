import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';

// POST /auth/register
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ error: 'username, email y password son requeridos' });
      return;
    }

    const user = await registerUser(username, email, password, role);
    res.status(201).json({ message: 'Usuario registrado correctamente', user });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al registrar usuario';
    res.status(400).json({ error: message });
  }
}

// POST /auth/login
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'email y password son requeridos' });
      return;
    }

    const user = await loginUser(email, password);
    res.json({ message: 'Login exitoso', user });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al iniciar sesión';
    res.status(401).json({ error: message });
  }
}
