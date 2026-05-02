# Curso Git — SCESI
Repositorio del grupo para el curso de Git & GitHub de la SCESI.

**Integrantes:**

- Bruno Salcedo Cadiz
- Jouse Suarez Zabala
- Leyton Cespedes Valencia
- Orlando Altamirano Vargas

---

## Descripción del proyecto

Sistema de administración y publicación de noticias. Permite a un administrador crear, editar, eliminar y publicar noticias a través de un panel web. Los usuarios sin cuenta pueden ver las noticias publicadas en la vista pública.

---

## Tecnologías

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

- **Runtime:** Node.js
- **Framework:** Express 5
- **Lenguaje:** TypeScript
- **Almacenamiento:** Archivos JSON (`data/news.json`, `data/users.json`)
- **Upload de imágenes:** Multer

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

- **Library:** React 19
- **Lenguaje:** TypeScript
- **Bundler:** Vite
- **Routing:** React Router DOM 7

---

## Estructura del proyecto

```
Curso-Git-Scesi/
├── backend/
│   ├── data/
│   │   ├── news.json         # Almacenamiento de noticias
│   │   └── users.json        # Almacenamiento de usuarios
│   └── src/
│       ├── config/
│       │   ├── server.config.ts
│       │   └── server.routes.ts
│       └── modules/
│           ├── auth/         # Login y registro
│           ├── news/         # CRUD de noticias
│           └── shared/       # Upload, error handler
├── fronted/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── types/
├── API_INTEGRATION.md        # Guía de integración frontend ↔ backend
└── README.md
```

---

## Cómo correr el proyecto

### Backend

Requisitos: **Node.js 18+**

```bash
cd backend
npm install
npm run start:dev
```

El servidor queda corriendo en: `http://localhost:3000`

### Frontend

```bash
cd fronted
npm install
npm run dev
```

La app queda corriendo en: `http://localhost:5173`

> Asegúrate de levantar el backend **antes** que el frontend para que las llamadas a la API funcionen.

---

## Endpoints principales del backend

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registrar usuario |
| POST | `/auth/login` | Iniciar sesión |
| GET | `/news` | Listar noticias (soporta `?title=` y `?author=`) |
| GET | `/news/status/:status` | Filtrar por `draft` o `published` |
| GET | `/news/paginated` | Noticias paginadas (`?page=1&limit=5`) |
| GET | `/news/stats` | Estadísticas del sistema |
| GET | `/news/:id` | Obtener noticia por ID |
| POST | `/news` | Crear noticia |
| PATCH | `/news/:id` | Actualizar noticia |
| DELETE | `/news/:id` | Eliminar noticia |

Para el detalle completo de cada endpoint, cuerpos de request y respuestas ver [`API_INTEGRATION.md`](./API_INTEGRATION.md).

---

## Roles de usuario

| Rol | Acceso |
|-----|--------|
| `user` (sin login) | Solo noticias publicadas (`status: published`) |
| `admin` | Panel completo: crear, editar, eliminar, ver borradores |

---

## Flujo de trabajo Git

Este proyecto sigue **Gitflow**:

- `main` — código estable
- `develop` — integración de cambios
- `feature/*` — nuevas funcionalidades
- `hotfix/*` — correcciones urgentes

Convención de commits: [Conventional Commits](https://www.conventionalcommits.org/)
