# Curso Git - SCESI

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
