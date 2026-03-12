import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  transform(value: string): string {
    // Remove any HTML tags
    return value.replace(/<[^>]*>/g, '');
  }
}
