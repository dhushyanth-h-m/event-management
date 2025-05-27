# Event Management Platform

A real-time event management platform built with Next.js, React, MongoDB, WebSockets, and more.

## 🚀 Live Demo 

**Production URL **: https://event-management-chi-blush.vercel.app/

## ✨ Features


- **Real-time Updates**: WebSocket integration for live event updates
- **MongoDB Integration**: Persistent data storage with MongoDB Atlas
- **User Authentication**: Secure JWT-based authentication
- **Event Management**: Create, edit, and manage events
- **Admin Dashboard**: Administrative controls and analytics
- **Responsive Design**: Modern, mobile-friendly interface
- **CI/CD Pipeline**: Automated testing and deployment

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB Atlas
- **Real-time**: Socket.io WebSockets
- **Authentication**: JWT, bcryptjs
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions, ESLint

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/dhushyanth-h-m/event-management.git

# Navigate to project directory
cd event-management

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your MongoDB URI and JWT secret

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## 🚀 Deployment

This project uses automated deployment via GitHub Actions to Vercel:

- **Automatic deployment** on every push to main branch
- **Build verification** with ESLint and TypeScript checks
- **Production optimized** builds

## 📚 Learning Resources

Check out the documentation files for setup guides:
- `MONGODB_SETUP.md` - MongoDB Atlas configuration
- `DEPLOYMENT.md` - Deployment options and guides
- `ENVIRONMENT_SETUP.md` - Environment variables setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

---

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