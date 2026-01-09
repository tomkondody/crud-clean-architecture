# API Documentation

## Base URL
```
http://localhost:8000/api/v1
```

## Endpoints

### Users

#### 1. List All Users
```http
GET /users/
```

**Response (200 OK)**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "phone": "+1 234 567 8900",
    "website": "https://example.com"
  }
]
```

---

#### 2. Get User by ID
```http
GET /users/{id}/
```

**Response (200 OK)**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "phone": "+1 234 567 8900",
  "website": "https://example.com"
}
```

**Response (404 Not Found)**
```json
{
  "detail": "User not found"
}
```

---

#### 3. Create User
```http
POST /users/
```

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "phone": "+1 234 567 8900",
  "website": "https://example.com"
}
```

**Validation Rules**
- `name`: Required, max 255 characters
- `email`: Required, valid email format, unique
- `username`: Required, max 150 characters, unique
- `phone`: Optional, max 20 characters
- `website`: Optional, max 200 characters

**Response (201 Created)**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "phone": "+1 234 567 8900",
  "website": "https://example.com"
}
```

**Response (400 Bad Request)**
```json
{
  "email": ["This field is required."],
  "username": ["User with this username already exists."]
}
```

---

#### 4. Update User
```http
PUT /users/{id}/
```

**Request Body**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "username": "johnupdated",
  "phone": "+1 234 567 8901",
  "website": "https://updated.com"
}
```

**Response (200 OK)**
```json
{
  "id": 1,
  "name": "John Updated",
  "email": "john.updated@example.com",
  "username": "johnupdated",
  "phone": "+1 234 567 8901",
  "website": "https://updated.com"
}
```

**Response (404 Not Found)**
```json
{
  "detail": "User not found"
}
```

---

#### 5. Partial Update User
```http
PATCH /users/{id}/
```

**Request Body** (any subset of fields)
```json
{
  "name": "John Partially Updated"
}
```

**Response (200 OK)**
```json
{
  "id": 1,
  "name": "John Partially Updated",
  "email": "john@example.com",
  "username": "johndoe",
  "phone": "+1 234 567 8900",
  "website": "https://example.com"
}
```

---

#### 6. Delete User
```http
DELETE /users/{id}/
```

**Response (204 No Content)**
```
(Empty response body)
```

**Response (404 Not Found)**
```json
{
  "detail": "User not found"
}
```

---

## Error Responses

### 400 Bad Request
Validation errors or malformed request.

```json
{
  "field_name": ["Error message"]
}
```

### 404 Not Found
Resource not found.

```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error
Server error.

```json
{
  "detail": "Internal server error"
}
```

---

## CORS Configuration

The API supports CORS for the following origins:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative frontend)

Allowed methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding in production.

---

## Authentication

Currently no authentication is required. For production, consider adding:
- JWT authentication
- API key authentication
- OAuth2

---

## Pagination

For large datasets, pagination can be added:

```http
GET /users/?page=1&page_size=10
```

**Response**
```json
{
  "count": 100,
  "next": "http://localhost:8000/api/v1/users/?page=2",
  "previous": null,
  "results": [...]
}
```
