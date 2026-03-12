export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logo: string;
  bannerImage: string;
  cuisines: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: number; // in minutes
  deliveryCharge: number;
  minimumOrder: number;
  isOpen: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  operatingHours: OperatingHours;
  menu: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OperatingHours {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}

export interface TimeSlot {
  open: string; // HH:mm
  close: string; // HH:mm
  isClosed: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  rating?: number;
  createdAt: Date;
}
