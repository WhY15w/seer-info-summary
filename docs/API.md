# API Documentation

This document provides detailed information about the Seer Info Summary API endpoints.

## Base URL

```
http://localhost:3003/seer-api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### POST /auth/login
User login endpoint.

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "captcha": "string"
}
```

**Response:**
```json
{
  "code": 200,
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "username": "username"
    }
  }
}
```

#### POST /auth/register
User registration endpoint.

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "emailCode": "string",
  "captcha": "string"
}
```

### Resources

#### GET /
Get logger information from configured sources.

**Response:**
```json
{
  "code": 200,
  "data": [
    {
      "name": "resource-name",
      "url": "download-url",
      "size": "file-size",
      "time": "update-time"
    }
  ]
}
```

#### GET /plugin-center
Get plugin center information with optional filtering.

**Query Parameters:**
- `name` (string): Filter by plugin name
- `author` (string): Filter by author
- `type` (string): Filter by plugin type
- `sort` (number): Sort order (1 for newest, -1 for oldest)

**Response:**
```json
{
  "code": 200,
  "data": [
    {
      "name": "plugin-name",
      "author": "author-name",
      "type": "plugin-type",
      "download": "download-url",
      "psd": "password",
      "wtime": "update-time",
      "new": true
    }
  ]
}
```

### User Management

#### GET /user/profile
Get current user profile (requires authentication).

**Response:**
```json
{
  "code": 200,
  "data": {
    "username": "user-name",
    "email": "user-email",
    "createdAt": "creation-date"
  }
}
```

#### POST /email/subscribe
Subscribe to email notifications.

**Request Body:**
```json
{
  "email": "user-email",
  "subscriptions": {
    "official": true,
    "plugins": false,
    "relive": true
  }
}
```

### Utility

#### GET /captcha
Get CAPTCHA image for verification.

**Response:**
```json
{
  "code": 200,
  "data": {
    "captcha": "base64-image-data"
  }
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "code": 400,
  "message": "Error description",
  "data": null
}
```

### Common Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API endpoints may have rate limiting implemented. Check response headers for rate limit information.

## Examples

### cURL Examples

```bash
# Get plugin center data
curl -X GET "http://localhost:3003/seer-api/plugin-center?sort=1"

# Login
curl -X POST "http://localhost:3003/seer-api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass","captcha":"1234"}'

# Get user profile (with auth)
curl -X GET "http://localhost:3003/seer-api/user/profile" \
  -H "Authorization: Bearer your-jwt-token"
```

### JavaScript Examples

```javascript
// Using fetch API
const response = await fetch('http://localhost:3003/seer-api/plugin-center');
const data = await response.json();

// Login example
const loginResponse = await fetch('http://localhost:3003/seer-api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'testuser',
    password: 'testpass',
    captcha: '1234'
  })
});
```

For more detailed examples and integration guides, see the main [README.md](../README.md).