import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import AppRoutes from './server.routes';
import '../modules/shared/upload'; // Inicializa la carpeta uploads

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/', AppRoutes);


export default app;