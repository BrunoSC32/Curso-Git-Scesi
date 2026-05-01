import multer from 'multer';
import path from 'path';
import { Request } from 'express';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads'); /// devuelve el path de nuestra carpeta raiz y luego le agrega uploads (C:/Users/leyto/Desktop/LEYTON/Sistema de noticias/backend/uploads)

const storage = multer.diskStorage({ // indicamos donde guardaremos los archivos subidos y con que nombre
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `news-${uniqueSuffix}${ext}`);
  },
});