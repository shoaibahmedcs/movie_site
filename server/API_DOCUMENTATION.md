# Movie Site Backend API Documentation

Base URL: `http://localhost:5000`

---

## Authentication APIs

### 1. Signup
Create a new user account.

**Endpoint:** `POST /api/auth/signup`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "673456789abcdef123456789",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "message": "User already exists"
}
```

---

### 2. Login
Login to existing account.

**Endpoint:** `POST /api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "673456789abcdef123456789",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Invalid credentials"
}
```

---

### 3. Get Current User
Get logged-in user details.

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "id": "673456789abcdef123456789",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-11-13T10:30:00.000Z"
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized"
}
```

---

### 4. Forgot Password
Request a password reset code.

**Endpoint:** `POST /api/auth/forgot-password`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Reset code generated",
  "resetToken": "123456",
  "email": "john@example.com",
  "expiresIn": "15 minutes"
}
```

**Note:** In production, `resetToken` should be sent via email, not in the response.

**Error Response (404):**
```json
{
  "message": "User not found"
}
```

---

### 5. Reset Password
Reset password using the reset token.

**Endpoint:** `POST /api/auth/reset-password`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "resetToken": "123456",
  "newPassword": "newpassword123"
}
```

**Success Response (200):**
```json
{
  "message": "Password reset successful"
}
```

**Error Response (400):**
```json
{
  "message": "Invalid reset token"
}
```

**Error Response (400):**
```json
{
  "message": "Reset token has expired"
}
```

---

## Watchlist APIs

### 4. Get User Watchlist
Get all movies in user's watchlist.

**Endpoint:** `GET /api/watchlist`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
[
  {
    "_id": "673456789abcdef123456789",
    "userId": "673456789abcdef123456789",
    "movieId": 550,
    "movieTitle": "Fight Club",
    "posterPath": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "addedAt": "2025-11-23T10:30:00.000Z"
  },
  {
    "_id": "673456789abcdef123456790",
    "userId": "673456789abcdef123456789",
    "movieId": 680,
    "movieTitle": "Pulp Fiction",
    "posterPath": "/fIE3lAGcZDV1G6XM5KmuLuKkqmu.jpg",
    "addedAt": "2025-11-23T11:15:00.000Z"
  }
]
```

---

### 5. Add to Watchlist
Add a movie to user's watchlist.

**Endpoint:** `POST /api/watchlist/:movieId`

**URL Parameters:**
- `movieId` (number) - TMDB movie ID

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "movieTitle": "Fight Club",
  "posterPath": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
}
```

**Success Response (201):**
```json
{
  "message": "Added to watchlist",
  "watchlistItem": {
    "_id": "673456789abcdef123456789",
    "userId": "673456789abcdef123456789",
    "movieId": 550,
    "movieTitle": "Fight Club",
    "posterPath": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "addedAt": "2025-11-23T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Movie already in watchlist"
}
```

---

### 6. Remove from Watchlist
Remove a movie from user's watchlist.

**Endpoint:** `DELETE /api/watchlist/:movieId`

**URL Parameters:**
- `movieId` (number) - TMDB movie ID

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "message": "Removed from watchlist"
}
```

---

## Review APIs

### 7. Get Movie Reviews
Get all reviews for a specific movie.

**Endpoint:** `GET /api/reviews/:movieId`

**URL Parameters:**
- `movieId` (number) - TMDB movie ID

**Success Response (200):**
```json
[
  {
    "_id": "673456789abcdef123456789",
    "userId": {
      "_id": "673456789abcdef123456789",
      "name": "John Doe"
    },
    "movieId": 550,
    "rating": 5,
    "review": "Amazing movie! Best I've ever seen.",
    "createdAt": "2025-11-23T10:30:00.000Z"
  }
]
```

---

### 8. Add Review
Add a review for a movie.

**Endpoint:** `POST /api/reviews/:movieId`

**URL Parameters:**
- `movieId` (number) - TMDB movie ID

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "rating": 5,
  "review": "Amazing movie! Best I've ever seen."
}
```

**Success Response (201):**
```json
{
  "message": "Review added",
  "review": {
    "_id": "673456789abcdef123456789",
    "userId": {
      "_id": "673456789abcdef123456789",
      "name": "John Doe"
    },
    "movieId": 550,
    "rating": 5,
    "review": "Amazing movie! Best I've ever seen.",
    "createdAt": "2025-11-23T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "You already reviewed this movie"
}
```

---

### 9. Update Review
Update an existing review.

**Endpoint:** `PUT /api/reviews/:reviewId`

**URL Parameters:**
- `reviewId` (string) - Review MongoDB ID

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "rating": 4,
  "review": "Good movie, updated my review."
}
```

**Success Response (200):**
```json
{
  "message": "Review updated",
  "review": {
    "_id": "673456789abcdef123456789",
    "userId": "673456789abcdef123456789",
    "movieId": 550,
    "rating": 4,
    "review": "Good movie, updated my review.",
    "createdAt": "2025-11-23T10:30:00.000Z"
  }
}
```

**Error Response (403):**
```json
{
  "message": "Not authorized"
}
```

---

### 10. Delete Review
Delete a review.

**Endpoint:** `DELETE /api/reviews/:reviewId`

**URL Parameters:**
- `reviewId` (string) - Review MongoDB ID

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "message": "Review deleted"
}
```

**Error Response (403):**
```json
{
  "message": "Not authorized"
}
```

---

## Authentication Flow

1. **Signup** → Get JWT token
2. **Save token** in localStorage/sessionStorage
3. **Use token** in Authorization header for protected routes
4. **Token format:** `Bearer YOUR_JWT_TOKEN`
5. **Token expires** in 7 days

---

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors, duplicate data)
- `401` - Unauthorized (missing token)
- `403` - Forbidden (invalid token or not authorized)
- `404` - Not Found
- `500` - Server Error

---

## Example: Complete Workflow

### 1. Sign up
```bash
POST http://localhost:5000/api/auth/signup
Body: {"name":"John","email":"john@example.com","password":"pass123"}
Response: {"token":"eyJhbG...","user":{...}}
```

### 2. Add to Watchlist
```bash
POST http://localhost:5000/api/watchlist/550
Headers: Authorization: Bearer eyJhbG...
Body: {"movieTitle":"Fight Club","posterPath":"/path.jpg"}
Response: {"message":"Added to watchlist",...}
```

### 3. Add Review
```bash
POST http://localhost:5000/api/reviews/550
Headers: Authorization: Bearer eyJhbG...
Body: {"rating":5,"review":"Great movie!"}
Response: {"message":"Review added",...}
```

### 4. Get Watchlist
```bash
GET http://localhost:5000/api/watchlist
Headers: Authorization: Bearer eyJhbG...
Response: [{movieId:550,...},{movieId:680,...}]
```

---

## Notes

- All protected routes require JWT token in Authorization header
- Token format: `Bearer YOUR_JWT_TOKEN`
- All dates are in ISO 8601 format
- Movie IDs are from TMDB (The Movie Database)
- Rating must be between 1-5
