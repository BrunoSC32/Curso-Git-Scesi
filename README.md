# Curso Git - SCESI

Repositorio del grupo para el curso de Git y GitHub de la SCESI.

## Integrantes

- Bruno Salcedo Cadiz
- Jouse Suarez Zabala
- Leyton Cespedes Valencia
- Orlando Altamirano Vargas

## Proyecto

Sistema de administracion de noticias con:
- backend en Express + TypeScript# Curso Git - SCESI

Repositorio del grupo para el curso de Git y GitHub de la SCESI.

## Integrantes

- Bruno Salcedo Cadiz
- Jouse Suarez Zabala
- Leyton Cespedes Valencia
- Orlando Altamirano Vargas

## Proyecto

Sistema de administracion de noticias con:
- backend en Express + TypeScript
- frontend en React + Vite
- CRUD administrativo de noticias

En esta fase, el frontend administrativo ya consume la API real del backend para listar, crear, editar y eliminar noticias.
El acceso al panel usa una sesion local simulada en el navegador y no autentica contra el backend todavia.

## Estructura

```text
Curso-Git-Scesi/
|-- backend/
|   |-- data/
|   |-- src/
|   `-- package.json
|-- fronted/
|   |-- src/
|   |-- .env.example
|   `-- package.json
|-- API_INTEGRATION.md
`-- README.md
```

## Requisitos

- Node.js 18 o superior
- npm

## Inicio rapido

Si quieres levantar todo lo necesario de la forma mas corta:

1. Abrir una terminal para el backend
2. Abrir una segunda terminal para el frontend
3. Levantar primero el backend
4. Levantar despues el frontend
5. Entrar a `http://localhost:5173`
6. Iniciar sesion con cualquier correo y cualquier contrasena no vacios

## Backend

```bash
cd backend
npm install
npm run start:dev
```

Servidor local:
- `http://localhost:3000`

Archivos que usa el backend en local:
- `backend/data/news.json` para noticias
- `backend/data/users.json` para usuarios
- `backend/uploads/` para archivos subidos por el backend

## Frontend

Definir la URL base de la API:

```bash
cd fronted
echo VITE_API_URL=http://localhost:3000 > .env
```

Instalar dependencias y levantar Vite:

```bash
npm install
npm run dev
```

Aplicacion local:
- `http://localhost:5173`

Archivo de entorno esperado:
- `fronted/.env`

Valor minimo requerido:

```env
VITE_API_URL=http://localhost:3000
```

## Flujo local recomendado

1. Levantar primero el backend en `http://localhost:3000`
2. Levantar despues el frontend en `http://localhost:5173`
3. Abrir el panel de noticias
4. El sistema te redirigira a `/login`
5. Ingresar cualquier correo y cualquier contrasena no vacios
6. Verificar listado, creacion, edicion y eliminacion

## Prueba manual recomendada

Una vez dentro del panel:

1. Crear una noticia nueva
2. Confirmar que aparece en el listado
3. Editar titulo, contenido, autor o imagen
4. Confirmar que los cambios persisten al recargar
5. Eliminar la noticia
6. Confirmar que desaparece del listado

## Endpoints principales

Backend expone, entre otros, estos endpoints:

- `GET /news`
- `GET /news/:id`
- `POST /news`
- `PATCH /news/:id`
- `DELETE /news/:id`
- `POST /auth/login`
- `POST /auth/register`

Nota:
- el frontend actual usa la API real de `news`
- la pantalla `/login` todavia no consume `POST /auth/login`

## Contrato de integracion

La referencia de integracion frontend-backend para esta fase esta en:

- [API_INTEGRATION.md](./API_INTEGRATION.md)

## Alcance actual

Incluido:
- CRUD admin de noticias contra la API real
- `imageUrl` por JSON
- errores API con payload `{ "error": "..." }`
- login visual con sesion local persistida en `localStorage`

Pendiente para fases siguientes:
- auth real de extremo a extremo
- proteccion real de endpoints
- upload de archivos desde el frontend
- manejo de `status` en la interfaz admin

## Estado de autenticacion

La pantalla `/login` implementada en el frontend es una maqueta local:
- no consume `POST /auth/login`
- no valida credenciales contra el backend
- no genera token, cookie ni sesion de servidor
- no protege endpoints del backend

Su objetivo actual es solo modelar el flujo de acceso del panel y la proteccion visual de rutas.

## Troubleshooting

### El frontend no carga noticias

Revisar:
- que el backend siga levantado en `http://localhost:3000`
- que `fronted/.env` tenga `VITE_API_URL=http://localhost:3000`
- que no haya errores de CORS o de red en la consola del navegador

### El frontend abre pero vuelve a `/login`

Revisar:
- que hayas escrito correo y contrasena no vacios
- que el navegador permita `localStorage`
- que no hayas limpiado la sesion local al recargar o cerrar sesion

### El backend no arranca

Revisar:
- que ejecutaste `npm install` dentro de `backend`
- que el puerto `3000` no este siendo usado por otro proceso
- que tu version de Node.js sea `18+`

### El frontend no arranca

Revisar:
- que ejecutaste `npm install` dentro de `fronted`
- que el puerto `5173` no este siendo usado por otro proceso
- que el archivo `.env` exista dentro de `fronted`

## GitFlow

Ramas usadas en el proyecto:
- `main` para codigo estable
- `develop` para integracion
- `feature/*` para nuevas funcionalidades
- `hotfix/*` para correcciones urgentes

Convencion de commits:
- Conventional Commits

- frontend en React + Vite
- CRUD administrativo de noticias

En esta fase, el frontend administrativo ya consume la API real del backend para listar, crear, editar y eliminar noticias.
El acceso al panel usa una sesion local simulada en el navegador y no autentica contra el backend todavia.

## Estructura

```text
Curso-Git-Scesi/
|-- backend/
|   |-- data/
|   |-- src/
|   `-- package.json
|-- fronted/
|   |-- src/
|   |-- .env.example
|   `-- package.json
|-- API_INTEGRATION.md
`-- README.md
```

## Requisitos

- Node.js 18 o superior
- npm

## Backend

```bash
cd backend
npm install
npm run start:dev
```

Servidor local:
- `http://localhost:3000`

## Frontend

Definir la URL base de la API:

```bash
cd fronted
echo VITE_API_URL=http://localhost:3000 > .env
```

Instalar dependencias y levantar Vite:

```bash
npm install
npm run dev
```

Aplicacion local:
- `http://localhost:5173`

## Flujo local recomendado

1. Levantar primero el backend en `http://localhost:3000`
2. Levantar despues el frontend en `http://localhost:5173`
3. Abrir el panel de noticias
4. Verificar listado, creacion, edicion y eliminacion

## Contrato de integracion

La referencia de integracion frontend-backend para esta fase esta en:

- [API_INTEGRATION.md](./API_INTEGRATION.md)

## Alcance actual

Incluido:
- CRUD admin de noticias contra la API real
- `imageUrl` por JSON
- errores API con payload `{ "error": "..." }`
- login visual con sesion local persistida en `localStorage`

Pendiente para fases siguientes:
- auth real de extremo a extremo
- proteccion real de endpoints
- upload de archivos desde el frontend
- manejo de `status` en la interfaz admin

## Estado de autenticacion

La pantalla `/login` implementada en el frontend es una maqueta local:
- no consume `POST /auth/login`
- no valida credenciales contra el backend
- no genera token, cookie ni sesion de servidor
- no protege endpoints del backend

Su objetivo actual es solo modelar el flujo de acceso del panel y la proteccion visual de rutas.

## GitFlow

Ramas usadas en el proyecto:
- `main` para codigo estable
- `develop` para integracion
- `feature/*` para nuevas funcionalidades
- `hotfix/*` para correcciones urgentes

Convencion de commits:
- Conventional Commits
