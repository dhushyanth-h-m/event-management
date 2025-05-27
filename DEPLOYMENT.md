# Free Deployment Options

This guide shows you how to deploy your Event Management app for free using various platforms.

## Prerequisites: Set Up MongoDB Atlas (Required)

Your app needs a database to store events and user data. Follow these steps:

1. **Create MongoDB Atlas Account**: Go to [mongodb.com/atlas](https://www.mongodb.com/atlas/database)
2. **Choose Free Tier**: Select M0 Sandbox (512MB free)
3. **Create Database User**: Set username/password in "Database Access"
4. **Configure Network**: Allow access from anywhere (0.0.0.0/0) in "Network Access"
5. **Get Connection String**: Copy from "Connect" button on your cluster

See `MONGODB_SETUP.md` for detailed instructions.

## Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications and offers generous free hosting.

### Steps:
1. Create an account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Login: `vercel login`
4. Deploy: `vercel --prod`

### Or connect your GitHub repo:
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub account
4. Select this repository
5. **Add Environment Variables**:
   - `MONGODB_URI`: Your Atlas connection string
   - `JWT_SECRET`: A secure random string (32+ characters)
   - `NODE_ENV`: production
6. Vercel will automatically deploy on every push to main

## Option 2: Netlify

### Steps:
1. Create account at [netlify.com](https://netlify.com)
2. Build the app: `npm run build`
3. Drag and drop the `out` folder to Netlify dashboard
4. **Add Environment Variables** in site settings:
   - `MONGODB_URI`: Your Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `NODE_ENV`: production

## Testing Your Database Connection

After deployment, test your database connection:
1. Visit: `https://your-app-url.vercel.app/api/test-db`
2. Should return: `{"success": true, "message": "Database connection successful!"}`

## Seeding Your Database

To add sample data to your database:

```bash
# Install dependencies first
npm install

# Create .env.local file with your MongoDB Atlas connection string
# Then run:
npm run seed
```

This will create sample users and events:
- **Admin**: admin@example.com / password123
- **Organizer**: organizer@example.com / password123  
- **User**: user@example.com / password123

## Environment Variables Summary

For production deployment, you need:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.net/event-management` |
| `JWT_SECRET` | Secret for JWT tokens (32+ chars) | `your-super-secure-32-char-secret-key` |
| `NODE_ENV` | Environment mode | `production` |

## Free Database Options

- **MongoDB Atlas**: 512MB free tier ✅ (Recommended)
- **PlanetScale**: Generous free tier for MySQL
- **Supabase**: PostgreSQL with real-time features

## Current Deployment Status

The AWS/Kubernetes deployment has been disabled to avoid costs. The app is ready for free deployment using any of the above options with MongoDB Atlas. 