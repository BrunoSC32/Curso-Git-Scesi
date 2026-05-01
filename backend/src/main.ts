import Server from './config/server.config';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
   
    Server.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

start();
