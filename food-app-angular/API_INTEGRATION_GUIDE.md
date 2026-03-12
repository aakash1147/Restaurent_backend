# API Integration Guide

## Backend Integration

This Angular food delivery app integrates with a Django REST API. Below is the complete API specification and integration guide.

## Base Configuration

```typescript
// src/environments/environment.ts (Development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:3000'
};

// src/environments/environment.prod.ts (Production)
export const environment = {
  production: true,
  apiUrl: 'https://api.foodapp.com/api',
  wsUrl: 'wss://api.foodapp.com'
};
```

## Authentication Endpoints

### Login
```
POST /auth/login
Body: { email: string, password: string }
Response: { token: string, user: User }
```

### Register
```
POST /auth/register
Body: { firstName: string, lastName: string, email: string, phoneNumber: string, password: string }
Response: { token: string, user: User }
```

### Refresh Token
```
POST /auth/refresh
Body: { token: string }
Response: { token: string, user: User }
Headers: Authorization: Bearer <old_token>
```

### Password Reset
```
POST /auth/request-password-reset
Body: { email: string }

POST /auth/verify-reset-code
Body: { email: string, code: string }

POST /auth/reset-password
Body: { email: string, newPassword: string }
```

## Restaurant Endpoints

### List All Restaurants
```
GET /restaurants
Query Params: page=1, limit=10, sort=rating
Response: { data: Restaurant[], pagination: { total, pages } }
```

### Get Restaurant Detail
```
GET /restaurants/:id
Response: Restaurant
```

### Search Restaurants
```
GET /restaurants/search?q=<query>
Response: Restaurant[]
```

### Filter Restaurants
```
POST /restaurants/filter
Body: { 
  cuisines?: string[],
  minRating?: number,
  maxDeliveryTime?: number,
  priceRange?: 'low' | 'medium' | 'high'
}
Response: Restaurant[]
```

### Get Restaurant Menu
```
GET /restaurants/:id/menu
Response: FoodItem[]
```

### Get Restaurant Reviews
```
GET /restaurants/:id/reviews?page=1&limit=10
Response: Review[]
```

## Cart Endpoints

### Get Cart
```
GET /cart
Response: Cart
```

### Add to Cart
```
POST /cart/add
Body: { foodItemId: string, quantity: number, restaurantId: string }
Response: Cart
```

### Remove from Cart
```
DELETE /cart/:itemId
Response: Cart
```

### Update Quantity
```
PUT /cart/:itemId/quantity
Body: { quantity: number }
Response: Cart
```

### Clear Cart
```
DELETE /cart
Response: void
```

## Order Endpoints

### Create Order
```
POST /orders
Body: {
  restaurantId: string,
  items: CartItem[],
  deliveryAddress: Address,
  paymentMethod: string,
  couponCode?: string,
  specialInstructions?: string
}
Response: Order
```

### Get User Orders
```
GET /orders
Query Params: page=1, limit=10, status=all|pending|delivered
Response: Order[]
```

### Get Order Detail
```
GET /orders/:id
Response: Order
```

### Cancel Order
```
PUT /orders/:id/cancel
Body: { reason: string }
Response: Order
```

### Track Order
```
GET /orders/:id/track
Response: DeliveryStatus
```

## Review Endpoints

### Get Restaurant Reviews
```
GET /reviews/restaurant/:id?page=1&limit=10
Response: Review[]
```

### Get Average Rating
```
GET /reviews/restaurant/:id/average-rating
Response: { rating: number, count: number }
```

### Create Review
```
POST /reviews
Body: {
  restaurantId: string,
  rating: number,
  title: string,
  content: string,
  images?: string[]
}
Response: Review
```

### Update Review
```
PUT /reviews/:id
Body: Review
Response: Review
```

### Delete Review
```
DELETE /reviews/:id
Response: void
```

### Mark Review as Helpful
```
POST /reviews/:id/helpful
Response: Review
```

## Payment Endpoints

### Initiate Payment
```
POST /payments/initiate
Body: {
  orderId: string,
  amount: number,
  method: 'credit_card' | 'debit_card' | 'upi' | 'wallet'
}
Response: { paymentId: string, clientSecret?: string }
```

### Verify Payment
```
POST /payments/verify
Body: {
  paymentId: string,
  token: string
}
Response: Payment
```

### Get Payment Methods
```
GET /payments/methods
Response: PaymentMethod[]
```

### Save Payment Method
```
POST /payments/methods
Body: PaymentMethod
Response: PaymentMethod
```

### Get Payment History
```
GET /payments/history?limit=10
Response: Payment[]
```

### Refund Payment
```
POST /payments/:id/refund
Body: { reason: string }
Response: Payment
```

## Promotion/Coupon Endpoints

### List Active Promotions
```
GET /promotions/active
Response: Promotion[]
```

### Validate Coupon
```
POST /promotions/validate
Body: { code: string, orderValue: number }
Response: Promotion (with calculated discount)
```

### Apply Coupon
```
POST /promotions/apply
Body: { code: string }
Response: { discount: number, finalTotal: number }
```

### Get User Promotions
```
GET /promotions/user
Response: Promotion[]
```

## User Preference Endpoints

### Get Preferences
```
GET /user/preferences
Response: UserPreference
```

### Update Preferences
```
PUT /user/preferences
Body: Partial<UserPreference>
Response: UserPreference
```

### Get User Analytics
```
GET /user/analytics
Response: Analytics
```

### Add to Favorites
```
POST /favorites
Body: { restaurantId: string }
Response: Favorite
```

### Remove from Favorites
```
DELETE /favorites/:restaurantId
Response: void
```

### Get Favorites
```
GET /favorites
Response: Favorite[]
```

## Notification Endpoints

### Get Notifications
```
GET /notifications?limit=20
Response: Notification[]
```

### Get Unread Count
```
GET /notifications/unread-count
Response: number
```

### Mark as Read
```
PUT /notifications/:id/read
Response: Notification
```

### Mark All as Read
```
PUT /notifications/mark-all-read
Response: void
```

### Delete Notification
```
DELETE /notifications/:id
Response: void
```

### WebSocket Connection
```
WS /notifications
Sends: { type: 'order_update' | 'promotion' | 'system', data: {...} }
```

## Error Response Format

All errors follow this format:

```json
{
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE",
    "details": { },
    "validationErrors": { }
  }
}
```

## Common HTTP Status Codes

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation failed
- `429 Too Many Requests` - Rate limited
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Service down

## Request Headers

All requests should include:

```
Content-Type: application/json
Authorization: Bearer <token> (if authenticated)
```

## Rate Limiting

- Requests limited to 100 per minute per user
- Response includes headers:
  - `X-RateLimit-Limit: 100`
  - `X-RateLimit-Remaining: 99`
  - `X-RateLimit-Reset: 1609459200`

## Pagination

List endpoints support pagination:
- `page`: Page number (1-based)
- `limit`: Items per page (default: 10, max: 100)

Response includes:
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## Filtering & Sorting

### Filtering Example
```
GET /restaurants?cuisines=pizza,burger&minRating=4
```

### Sorting Example
```
GET /restaurants?sort=-rating,deliveryTime
```

## WebSocket Events

### Order Status Updates
```json
{
  "type": "order_update",
  "orderId": "123",
  "status": "preparing",
  "data": { ... }
}
```

### Promotions
```json
{
  "type": "promotion",
  "code": "SAVE20",
  "message": "New 20% off coupon available!"
}
```

### System Notifications
```json
{
  "type": "system",
  "title": "Maintenance",
  "message": "System maintenance scheduled"
}
```

## File Uploads

For image uploads (reviews, profile pictures):

```
POST /upload
Content-Type: multipart/form-data
Body: { file: File }
Response: { url: string }
```

## Best Practices

1. **Always use Authorization header with token**
2. **Handle errors gracefully with error interceptor**
3. **Implement retry logic for failed requests**
4. **Use request timeout (30 seconds)**
5. **Cache frequently accessed data**
6. **Batch requests when possible**
7. **Use WebSocket for real-time updates**
8. **Validate input before sending to server**
9. **Handle 401 responses by refreshing token**
10. **Log errors for debugging**

## Testing API Integration

Use Postman or similar tools to test endpoints:
1. Create collection for each feature
2. Set up environment variables for base URL
3. Test happy path and error scenarios
4. Verify request/response formats

## Debugging

Enable API logging:

```typescript
// In dev environment
if (!environment.production) {
  const originalLog = console.log;
  console.log = (args) => {
    originalLog('[API]', args);
  };
}
```

## Rate Limit Handling

```typescript
if (error.status === 429) {
  const retryAfter = error.headers.get('Retry-After');
  setTimeout(() => retryRequest(), retryAfter * 1000);
}
```

---

**Last Updated**: 2024
**API Version**: v1
**Status**: Production Ready
