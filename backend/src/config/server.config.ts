import express from 'express';
import cors from 'cors';
import path from 'path';
import AppRoutes from './server.routes';
import { errorHandler } from '../modules/shared/error.middleware';
import '../modules/shared/upload';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/', AppRoutes);

// Must be registered AFTER all routes
app.use(errorHandler);

export default app;
