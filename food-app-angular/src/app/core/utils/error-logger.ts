import { Injectable } from '@angular/core';

export interface ErrorLog {
  status: number;
  message: string;
  url?: string;
  timestamp: Date;
  details?: any;
  stackTrace?: string;
  userAgent?: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorLogger {
  private logs: ErrorLog[] = [];
  private readonly MAX_LOGS = 100;

  logError(error: ErrorLog): void {
    error.userAgent = navigator.userAgent;
    error.stackTrace = new Error().stack;
    
    this.logs.push(error);
    
    // Keep only recent logs
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS);
    }

    // Log to console in development
    if (!this.isProduction()) {
      console.error('Error Log:', error);
    }

    // Send to server if critical
    if (error.status >= 500) {
      this.sendToServer(error);
    }
  }

  private sendToServer(error: ErrorLog): void {
    // Implement sending error logs to backend analytics service
    // This would be called asynchronously
  }

  private isProduction(): boolean {
    return !location.hostname.includes('localhost');
  }

  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  downloadLogs(): void {
    const dataStr = JSON.stringify(this.logs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `error-logs-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
}
