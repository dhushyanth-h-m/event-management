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
git clone https://github.com/yourusername/event-management.git
cd event-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables by creating a `.env.local` file:
```
MONGODB_URI=mongodb://localhost:27017/event-management
JWT_SECRET=your-secret-key
```

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

## Deployment

### Kubernetes Deployment

The application can be deployed to Kubernetes using the manifests in the `kubernetes/` directory:

```bash
kubectl apply -f kubernetes/
```

### CI/CD Pipeline

This project includes a GitHub Actions workflow that:

1. Builds and tests the application
2. Creates a Docker image
3. Pushes the image to GitHub Container Registry
4. Deploys to Kubernetes (when pushing to the main branch)

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
├── public/                  # Static assets
├── .github/                 # GitHub Actions workflows
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose configuration
└── next.config.js           # Next.js configuration
```

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

## License

MIT 