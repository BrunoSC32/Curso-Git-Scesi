import Server from './config/server.config';
import { UPLOADS_DIR } from './modules/shared/upload';
import { initializeNewsFile } from './modules/news/news.service';
import fs from 'fs/promises';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    await initializeNewsFile();
   
    Server.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

start();
