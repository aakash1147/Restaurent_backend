import { Injectable } from '@angular/core';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  remove(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  removePattern(pattern: string | RegExp): void {
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
    
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  getTTL(key: string): number | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    const elapsed = Date.now() - entry.timestamp;
    const remaining = entry.ttl - elapsed;
    
    return remaining > 0 ? remaining : null;
  }

  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }
}
