# Deployment & DevOps Guide

## Local Development Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Angular CLI 21.x
- Git

### Initial Setup

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:4200
```

## Building for Production

### Production Build

```bash
# Build for production
npm run build

# Build with production-like configuration
ng build --configuration production

# Output directory: dist/food-app-angular/
```

### Build Optimization

The application includes optimization for:
- Tree shaking of unused code
- Minification and compression
- Lazy loading of modules
- Bundle splitting

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --stats-json
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/food-app-angular/stats.json
```

Current bundle sizes:
- Main: ~400KB (gzipped)
- Vendor: ~750KB (gzipped)
- Total: ~1.17MB

## Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Runtime stage
FROM nginx:alpine
COPY --from=builder /app/dist/food-app-angular /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "4200:80"
    environment:
      API_URL: http://localhost:3000/api
      WS_URL: ws://localhost:3000
```

### Build Docker Image

```bash
# Build image
docker build -t food-app-angular:latest .

# Run container
docker run -p 4200:80 food-app-angular:latest

# Push to registry
docker tag food-app-angular:latest myregistry/food-app-angular:latest
docker push myregistry/food-app-angular:latest
```

## Deployment Platforms

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# - API_URL=https://api.foodapp.com/api
# - WS_URL=wss://api.foodapp.com
```

### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
netlify deploy --prod --dir=dist/food-app-angular

# Configure in netlify.toml:
[build]
  command = "npm run build"
  publish = "dist/food-app-angular"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### AWS S3 + CloudFront

```bash
# Build app
npm run build

# Deploy to S3
aws s3 sync dist/food-app-angular/ s3://my-bucket/

# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name my-bucket.s3.amazonaws.com \
  --default-root-object index.html
```

### Google Cloud Run

```bash
# Build image
gcloud builds submit --tag gcr.io/my-project/food-app

# Deploy to Cloud Run
gcloud run deploy food-app \
  --image gcr.io/my-project/food-app \
  --platform managed \
  --region us-central1
```

### Azure App Service

```bash
# Build
npm run build

# Deploy using Azure CLI
az webapp up --name food-app-angular --resource-group myResourceGroup

# Or using GitHub Actions for CI/CD
```

## Environment Configuration

### Development Environments

#### Staging
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://staging-api.foodapp.com/api',
  wsUrl: 'wss://staging-api.foodapp.com'
};
```

#### Production
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.foodapp.com/api',
  wsUrl: 'wss://api.foodapp.com'
};
```

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --watch=false
      
      - name: Build
        run: npm run build -- --configuration production
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './dist/food-app-angular'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  image: node:18-alpine
  script:
    - npm ci
    - npm run build -- --configuration production
  artifacts:
    paths:
      - dist/food-app-angular/
  only:
    - main

test:
  stage: test
  image: node:18-alpine
  script:
    - npm ci
    - npm test -- --watch=false
  only:
    - main

deploy:
  stage: deploy
  image: node:18-alpine
  script:
    - npm install -g netlify-cli
    - netlify deploy --prod --dir=dist/food-app-angular
  only:
    - main
```

## Performance Monitoring

### Google Lighthouse

```bash
# Run Lighthouse audit
npm install -g lighthouse
lighthouse https://yourapp.com --view
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Core Web Vitals

Monitor in Google Search Console:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Error Tracking

Use Sentry or similar:

```typescript
import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: "https://your-sentry-dsn",
  environment: environment.production ? 'production' : 'staging',
  tracesSampleRate: 1.0,
});
```

## Scaling Strategies

### 1. Horizontal Scaling
- Deploy multiple instances behind load balancer
- Use container orchestration (Kubernetes)
- Auto-scaling based on CPU/memory usage

### 2. Caching Layer
- Implement CDN (CloudFront, Cloudflare)
- Browser caching with proper headers
- Service worker for offline support

### 3. Database Optimization
- Add indexes on frequently queried fields
- Implement database caching (Redis)
- Use read replicas for read-heavy operations

### 4. API Optimization
- Implement pagination
- Use GraphQL with query optimization
- Add request caching headers

## Monitoring & Logging

### Application Monitoring

```typescript
// Monitor performance
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Performance entry:', entry);
    // Send to monitoring service
  }
});

observer.observe({ entryTypes: ['navigation', 'resource'] });
```

### Error Logging

```typescript
// Centralized error handling
this.errorLogger.logError({
  status: 500,
  message: 'Server error',
  url: 'https://api.example.com/data',
  timestamp: new Date()
});
```

### Analytics

```typescript
// Track user events
this.analytics.trackEvent('user_signup', {
  source: 'google',
  timestamp: new Date()
});
```

## Security Headers

Configure nginx or your web server to add security headers:

```nginx
# nginx.conf
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "DENY";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self'";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

## Database Backups

Regular backups of user data:
- Daily incremental backups
- Weekly full backups
- Monthly long-term storage
- Test restore procedures quarterly

## Disaster Recovery

- RTO (Recovery Time Objective): < 1 hour
- RPO (Recovery Point Objective): < 15 minutes
- Documented recovery procedures
- Regular disaster drills

## Rollback Strategy

```bash
# Keep previous versions available
# Use feature flags for gradual rollouts
# Monitor metrics after deployment
# Quick rollback if issues detected

# Rollback command
kubectl rollout undo deployment/food-app
```

## Health Checks

Implement health endpoint:

```typescript
GET /health
Response: { status: 'healthy', uptime: 3600, version: '1.0.0' }
```

## Maintenance Windows

- Schedule: Sunday 2-4 AM UTC
- Notification: 7 days in advance
- Expected downtime: 30 minutes
- Automated deployment during window

---

**Last Updated**: 2024
**Version**: 1.0.0
