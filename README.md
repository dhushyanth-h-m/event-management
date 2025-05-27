# Real-Time Event Management Platform

A modern, scalable event management system built with Next.js, React, TypeScript, WebSockets, Node.js, MongoDB, Docker, and Kubernetes.

## Architecture

This application follows a microservices architecture with the following main components:

- **Frontend**: Next.js 14 with React 18, featuring SSR (Server-Side Rendering) and real-time UI updates via WebSockets
- **Backend**: Node.js API with hybrid REST/WebSocket capabilities
- **Database**: MongoDB with change streams for real-time data reactivity
- **Message Broker**: Redis Pub/Sub for cross-service communication
- **Containerization**: Docker and Kubernetes for deployment and scaling

## Key Features

- Real-time dashboard with live metrics
- WebSocket integration for instant updates
- Event-driven architecture
- Event management with CRUD operations
- Authentication and authorization
- Responsive UI built with TailwindCSS
- Horizontal scaling with Kubernetes

## Requirements

- Node.js 18 or higher
- Docker and Docker Compose (for local development)
- MongoDB
- Redis (for Pub/Sub functionality)

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/dhushyanth-h-m/event-management
cd event-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables by creating a `.env.local` file:
```env
MONGODB_URI=mongodb://localhost:27017/event-management
JWT_SECRET=your-super-secure-jwt-secret-key-please-change-this
NODE_ENV=development
```

**Important**: For production deployments, make sure to:
- Use a strong, unique JWT secret (minimum 32 characters)
- Use a secure MongoDB connection string with authentication
- Never commit secrets to the repository

4. Start the development server:
```bash
npm run dev
```

5. Visit http://localhost:3000 in your browser.

### Using Docker Compose

For a full development environment including MongoDB and Redis:

```bash
docker-compose up -d
```

## Deployment Options

This project supports multiple deployment strategies through automated CI/CD pipelines:

### Option 1: Full AWS EKS Deployment (Production)

**Workflow**: `.github/workflows/ci-cd.yaml`

This is the full production deployment pipeline that:
1. Builds and tests the application
2. Creates a Docker image and pushes to GitHub Container Registry
3. Deploys to AWS EKS cluster

**Prerequisites**:
- AWS account with EKS cluster set up
- GitHub repository secrets configured

**Required GitHub Secrets**:
| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | AWS IAM access key | `AKIA1234567890EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLE` |
| `AWS_REGION` | AWS region for EKS cluster | `us-west-2` |

**Setup Instructions**: See [AWS Setup Guide](./docs/AWS_SETUP.md) for detailed instructions.

### Option 2: Simple CI/CD (Development/Testing)

**Workflow**: `.github/workflows/ci-cd-simple.yaml`

This simplified pipeline:
1. Builds and tests the application
2. Creates a Docker image and pushes to GitHub Container Registry
3. Creates deployment artifacts for manual deployment

**No AWS secrets required** - perfect for:
- Testing the CI/CD pipeline
- Development environments
- Manual deployments to any platform

**Deployment Options from Artifacts**:
- Local Docker deployment
- Docker Compose deployment
- Manual Kubernetes deployment

### Configuring GitHub Secrets

To set up GitHub repository secrets:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the required secrets based on your deployment option

### Manual Deployment

You can also deploy manually using the built Docker images:

```bash
# Pull the latest image
docker pull ghcr.io/dhushyanth-h-m/event-management:latest

# Run with environment variables
docker run -p 3000:3000 \
  -e MONGODB_URI="your-mongodb-uri" \
  -e JWT_SECRET="your-jwt-secret" \
  ghcr.io/dhushyanth-h-m/event-management:latest
```

## CI/CD Pipeline Status

The current CI/CD pipeline automatically:

✅ **Tests and builds** the Next.js application  
✅ **Creates Docker images** and pushes to GitHub Container Registry  
✅ **Provides deployment artifacts** for flexible deployment options  
⚠️ **AWS deployment** requires AWS credentials configuration  

## Architecture Details

### WebSocket Implementation

The application uses Socket.IO for real-time communication, integrated with Next.js API routes. MongoDB change streams are used to propagate database changes to connected clients.

WebSocket connections are authenticated using JWT tokens, and the system includes fallback mechanisms for unstable connections.

### Database Design

The MongoDB schema is optimized for high-write scenarios with appropriate indexing strategies. The application uses change streams to monitor database updates in real-time.

### Scaling Strategy

The application can be horizontally scaled using Kubernetes, with autoscaling based on WebSocket connections and resource utilization.

## Project Structure

```
├── app/                     # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication API
│   │   ├── events/          # Events API
│   │   └── ws/              # WebSocket endpoint
│   ├── dashboard/           # Dashboard page
│   └── ...
├── components/              # React components
├── lib/                     # Shared libraries
│   ├── hooks/               # Custom React hooks
│   ├── models/              # MongoDB models
│   └── utils/               # Utility functions
├── kubernetes/              # Kubernetes manifests
├── docs/                    # Documentation
├── public/                  # Static assets
├── .github/                 # GitHub Actions workflows
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose configuration
└── next.config.js           # Next.js configuration
```

## Troubleshooting

### Common CI/CD Issues

1. **"Input required and not supplied: aws-region"**
   - Add AWS secrets to GitHub repository settings
   - Or use the simple CI/CD workflow instead

2. **Docker build fails**
   - Check if all dependencies are in `package.json`
   - Ensure `public/` directory exists

3. **TypeScript errors during build**
   - Run `npm run build` locally to debug
   - Check type definitions in `lib/utils/auth.ts`

### Development Issues

1. **WebSocket connection fails**
   - Ensure the API route `/api/ws` is accessible
   - Check browser developer tools for connection errors

2. **MongoDB connection issues**
   - Verify `MONGODB_URI` environment variable
   - Ensure MongoDB is running locally

## Monitoring and Observability

The application includes built-in monitoring for:

- WebSocket connections and metrics
- API performance
- Database operations

Integration with Prometheus and Grafana is available for advanced monitoring capabilities.

## Security Considerations

- JWT authentication for API and WebSocket connections
- Rate limiting for API endpoints
- Secure WebSocket handshake mechanism
- Environment-based configuration for secrets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run build`
5. Submit a pull request

The CI/CD pipeline will automatically test your changes.

## License

MIT 