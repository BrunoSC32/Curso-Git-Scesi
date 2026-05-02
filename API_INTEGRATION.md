# API Integration Guide

## Scope

This document defines the frontend-backend contract for the admin news panel in the current integration phase.

Included in this phase:
- Admin CRUD for news
- JSON requests and responses
- Standard error payloads

Excluded from this phase:
- Real frontend authentication against backend
- Protected backend endpoints
- File upload flow from the frontend
- Frontend support for `status`

## Base URL

- Backend local URL: `http://localhost:3000`
- Frontend local URL: `http://localhost:5173`

The frontend must call the backend directly from the browser.

## Error Format

Handled API errors must use this JSON shape:

```json
{
  "error": "Human-readable message"
}
```

## News Resource

### News shape returned to the frontend

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "author": "string",
  "imageUrl": "string",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

Notes:
- `content` is optional in storage, but the admin frontend always sends it.
- `imageUrl` is optional.
- Backend may keep extra internal fields such as `status`, but the frontend does not depend on them in this phase.

### Request payload used by the frontend

```json
{
  "title": "string",
  "content": "string",
  "author": "string",
  "imageUrl": "string"
}
```

Notes:
- `imageUrl` is optional.
- Requests are sent as `application/json`.
- The frontend does not send `multipart/form-data` in this phase.
- The backend must assign default internal values such as `status` when needed.

## Endpoints Used by the Admin Frontend

### `GET /news`

Returns the news collection for the admin panel.

Behavior:
- Response body is a JSON array of news items.
- Items should be sorted by `updatedAt` in descending order.

Success response:

```json
[
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "author": "string",
    "imageUrl": "string",
    "createdAt": "2026-05-02T12:00:00.000Z",
    "updatedAt": "2026-05-02T12:00:00.000Z"
  }
]
```

### `GET /news/:id`

Returns one news item by id.

Success response:

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "author": "string",
  "imageUrl": "string",
  "createdAt": "2026-05-02T12:00:00.000Z",
  "updatedAt": "2026-05-02T12:00:00.000Z"
}
```

Error response:

```json
{
  "error": "Noticia no encontrada"
}
```

### `POST /news`

Creates one news item.

Request body:

```json
{
  "title": "Nueva noticia",
  "content": "Contenido de la noticia",
  "author": "Redaccion",
  "imageUrl": "https://example.com/image.jpg"
}
```

Success response:
- Status: `201 Created`
- Body: created news item

Validation rules required by this phase:
- `title` is required
- `author` is required

### `PATCH /news/:id`

Updates one news item.

Request body:

```json
{
  "title": "Titular actualizado",
  "content": "Contenido actualizado",
  "author": "Nuevo autor",
  "imageUrl": "https://example.com/updated-image.jpg"
}
```

Required behavior:
- Must persist changes for `title`, `content`, `author`, and `imageUrl`
- Must update `updatedAt`
- Must return `404` when the record does not exist

### `DELETE /news/:id`

Deletes one news item.

Success response:

```json
{
  "message": "Noticia eliminada correctamente"
}
```

Allowed response variation:
- The backend may include the deleted record in the response, as long as `message` is preserved.

## Compatibility Rules for This Phase

- The current frontend contract is the source of truth for the CRUD fields.
- The backend must remain compatible with JSON-based requests from the admin UI.
- The frontend must not depend on backend auth yet.
- The frontend must not depend on uploads or `status` in this phase.
