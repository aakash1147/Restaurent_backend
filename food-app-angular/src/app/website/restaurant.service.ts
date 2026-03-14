import { Injectable } from '@angular/core';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  address: string;
  image?: string;
  menu: MenuItem[];
}

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Bella Pasta',
      cuisine: 'Italian',
      rating: 4.6,
      address: '12 Olive Street',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80',
      menu: [
        { id: 1, name: 'Spaghetti Carbonara', price: 12.5, description: 'Classic carbonara with pancetta', image: '' },
        { id: 2, name: 'Margherita Pizza', price: 10, description: 'Fresh basil, tomato, mozzarella', image: '' }
      ]
    },
    {
      id: 2,
      name: 'Sushi Hana',
      cuisine: 'Japanese',
      rating: 4.8,
      address: '88 Sakura Ave',
      image: 'https://images.unsplash.com/photo-1546069901-eacef0df6022?w=800&q=80',
      menu: [
        { id: 10, name: 'Salmon Nigiri', price: 3.5, description: 'Fresh salmon slices', image: '' },
        { id: 11, name: 'Miso Soup', price: 2.5, description: 'Warm miso with tofu', image: '' }
      ]
    },
    {
      id: 3,
      name: 'Spice Route',
      cuisine: 'Indian',
      rating: 4.4,
      address: '5 Curry Lane',
      image: 'https://images.unsplash.com/photo-1604908177522-7b9f81f9d60b?w=800&q=80',
      menu: [
        { id: 20, name: 'Butter Chicken', price: 11.0, description: 'Creamy tomato sauce', image: '' },
        { id: 21, name: 'Garlic Naan', price: 2.0, description: 'Oven-baked flatbread', image: '' }
      ]
    }
  ];

  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  getRestaurant(id: number): Restaurant | undefined {
    return this.restaurants.find(r => r.id === Number(id));
  }
}
