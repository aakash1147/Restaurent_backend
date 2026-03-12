export interface Review {
  id: string;
  userId: string;
  restaurantId: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  helpful: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: string;
  restaurantId?: string;
  foodItemId?: string;
  userId: string;
  value: number; // 1-5
  review?: Review;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  method: 'credit_card' | 'debit_card' | 'upi' | 'wallet' | 'net_banking';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paymentGateway?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Promotion {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  maxUsage?: number;
  usageCount: number;
  startDate: Date;
  expiryDate: Date;
  applicableRestaurants?: string[];
  status: 'active' | 'inactive' | 'expired';
}

export interface Favorite {
  id: string;
  userId: string;
  restaurantId: string;
  createdAt: Date;
}

export interface UserPreference {
  id: string;
  userId: string;
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  dietaryRestrictions?: string[];
  cuisinePreferences?: string[];
  theme: 'light' | 'dark' | 'auto';
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryStatus {
  id: string;
  orderId: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  latitude?: number;
  longitude?: number;
  estimatedDeliveryTime?: Date;
  deliveryPersonName?: string;
  deliveryPersonPhone?: string;
  deliveryPersonRating?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'promotion' | 'system' | 'review' | 'payment';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export interface Analytics {
  totalOrders: number;
  totalSpent: number;
  favoriteRestaurant?: string;
  preferredCuisine?: string;
  ordersThisMonth: number;
  averageOrderValue: number;
  lastOrderDate?: Date;
}
