export interface FoodItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  isVegetarian: boolean;
  isSpicy: boolean;
  preparationTime: number; // in minutes
  customizations?: FoodCustomization[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodCustomization {
  id: string;
  name: string;
  options: CustomizationOption[];
  required: boolean;
}

export interface CustomizationOption {
  id: string;
  name: string;
  additionalPrice: number;
}
