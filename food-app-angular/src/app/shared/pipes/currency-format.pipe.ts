import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, currency: string = '₹'): string {
    if (!value) return '0';
    return `${currency} ${value.toFixed(2)}`;
  }
}
