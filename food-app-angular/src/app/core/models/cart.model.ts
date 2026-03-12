export interface Cart {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  taxAmount: number;
  deliveryCharge: number;
  discountAmount: number;
  couponCode?: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  foodItemId: string;
  foodName: string;
  quantity: number;
  price: number;
  customizations: CartItemCustomization[];
  notes?: string;
  subtotal: number;
}

export interface CartItemCustomization {
  customizationId: string;
  customizationName: string;
  optionId: string;
  optionName: string;
  additionalPrice: number;
}
