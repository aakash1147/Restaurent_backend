export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryAddress: DeliveryAddress;
  subtotal: number;
  taxAmount: number;
  deliveryCharge: number;
  discountAmount: number;
  total: number;
  specialInstructions?: string;
  estimatedDeliveryTime?: Date;
  expectedDeliveryTime?: number; // in minutes
  actualDeliveryTime?: Date;
  tracking?: OrderTracking;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  foodItemId: string;
  foodName: string;
  quantity: number;
  price: number;
  customizations: OrderItemCustomization[];
  subtotal: number;
}

export interface OrderItemCustomization {
  customizationName: string;
  optionName: string;
  additionalPrice: number;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  instructions?: string;
}

export interface OrderTracking {
  status: TrackingStatus;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  deliveryPersonId?: string;
  deliveryPersonName?: string;
  deliveryPersonPhone?: string;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum TrackingStatus {
  ASSIGNED = 'assigned',
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered'
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  UPI = 'upi',
  WALLET = 'wallet',
  NET_BANKING = 'net_banking',
  CASH_ON_DELIVERY = 'cash_on_delivery'
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}
