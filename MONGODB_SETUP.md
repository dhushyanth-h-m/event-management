# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database)
2. Click "Try Free" and sign up
3. Choose **M0 Sandbox (FREE)** - gives you 512MB storage for free
4. Select AWS/Google Cloud/Azure and choose a region close to you
5. Name your cluster (e.g., "event-management-cluster")

## Step 2: Configure Database Access
1. In Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username/password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User" 

## Step 3: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0) for now
   - Note: In production, you'd restrict this to specific IPs
4. Click "Confirm"

## Step 4: Get Connection String
1. Go to "Database" (main dashboard)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `event-management`

Your connection string will look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/event-management?retryWrites=true&w=majority
```

## Step 5: Environment Variables
Add to your `.env.local` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/event-management?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters
NODE_ENV=development
```

## Step 6: For Vercel Deployment
In your Vercel dashboard:
1. Go to your project settings
2. Add Environment Variables:
   - MONGODB_URI: (your Atlas connection string)
   - JWT_SECRET: (your secure JWT secret)
   - NODE_ENV: production 