import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | null, currency: string = 'INR'): string {
    if (value === null || value === undefined) {
      return '';
    }

    const currencySymbols: Record<string, string> = {
      'INR': '₹',
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    };

    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${value.toFixed(2)}`;
  }
}

@Pipe({
  name: 'ratingClass',
  standalone: true
})
export class RatingClassPipe implements PipeTransform {
  transform(rating: number | null): string {
    if (!rating) return 'rating-low';
    if (rating >= 4.5) return 'rating-excellent';
    if (rating >= 4) return 'rating-very-good';
    if (rating >= 3.5) return 'rating-good';
    if (rating >= 3) return 'rating-fair';
    return 'rating-low';
  }
}

@Pipe({
  name: 'deliveryTime',
  standalone: true
})
export class DeliveryTimePipe implements PipeTransform {
  transform(minutes: number | null): string {
    if (!minutes) return '';
    if (minutes < 1) return '< 1 min';
    if (minutes === 1) return '1 min';
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours} hr`;
    return `${hours}h ${mins}m`;
  }
}

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null, limit: number = 50): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}

@Pipe({
  name: 'formatAddress',
  standalone: true
})
export class FormatAddressPipe implements PipeTransform {
  transform(address: any): string {
    if (!address) return '';
    const parts = [
      address.street,
      address.city,
      address.state,
      address.zipCode,
      address.country
    ].filter(Boolean);
    return parts.join(', ');
  }
}

@Pipe({
  name: 'formatPhone',
  standalone: true
})
export class FormatPhonePipe implements PipeTransform {
  transform(phone: string | null): string {
    if (!phone) return '';
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 $2-$3-$4');
    }
    return phone;
  }
}

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) return '';
    
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 30) return 'just now';
    if (seconds < 60) return `${Math.floor(seconds / 10) * 10} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
}
