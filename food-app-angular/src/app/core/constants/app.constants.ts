export const API_CONSTANTS = {
  BASE_URL: 'http://localhost:3000/api', // Change based on environment
  TIMEOUT: 30000,
  VERSION: 'v1',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      PROFILE: '/auth/profile'
    },
    RESTAURANTS: {
      GET_ALL: '/restaurants',
      GET_BY_ID: '/restaurants/:id',
      GET_NEARBY: '/restaurants/nearby',
      SEARCH: '/restaurants/search',
      GET_MENU: '/restaurants/:id/menu'
    },
    FOOD_ITEMS: {
      GET_ALL: '/food-items',
      GET_BY_ID: '/food-items/:id',
      SEARCH: '/food-items/search'
    },
    ORDERS: {
      GET_ALL: '/orders',
      GET_BY_ID: '/orders/:id',
      CREATE: '/orders',
      UPDATE_STATUS: '/orders/:id/status',
      CANCEL: '/orders/:id/cancel',
      TRACK: '/orders/:id/track'
    },
    CART: {
      GET: '/cart',
      ADD_ITEM: '/cart/items',
      UPDATE_ITEM: '/cart/items/:id',
      REMOVE_ITEM: '/cart/items/:id',
      CLEAR: '/cart/clear'
    },
    REVIEWS: {
      GET_BY_RESTAURANT: '/reviews/restaurant/:id',
      GET_BY_FOOD: '/reviews/food/:id',
      CREATE: '/reviews',
      DELETE: '/reviews/:id'
    },
    PAYMENTS: {
      CREATE_PAYMENT: '/payments',
      VERIFY_PAYMENT: '/payments/verify',
      GET_PAYMENT: '/payments/:id'
    }
  }
};

export const APP_CONSTANTS = {
  APP_NAME: 'Food App',
  APP_VERSION: '1.0.0',
  CURRENCY: 'INR',
  CURRENCY_SYMBOL: '₹',
  PAGINATION_SIZE: 10,
  DEFAULT_IMAGE: 'assets/images/placeholder.png',
  TOAST_TIMEOUT: 3000,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  DEBOUNCE_TIME: 300,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
};

export const VALIDATION_RULES = {
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^\d{10}$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  ZIPCODE_PATTERN: /^\d{5,6}$/
};

export const ROUTE_CONSTANTS = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  RESTAURANTS: '/restaurants',
  RESTAURANT_DETAIL: '/restaurants/:id',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  USER_PROFILE: '/profile',
  ADDRESS_MANAGEMENT: '/addresses',
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/unauthorized'
};

export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  RESTAURANT_OWNER: 'RESTAURANT_OWNER',
  DELIVERY_PARTNER: 'DELIVERY_PARTNER',
  ADMIN: 'ADMIN'
};
