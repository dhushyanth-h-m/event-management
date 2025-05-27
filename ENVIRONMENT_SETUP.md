# Environment Variables Setup

## For Local Development

1. **Create `.env.local` file** in the root directory of your project

2. **Add the following variables**:

```bash
# MongoDB Atlas Connection String
# Get this from MongoDB Atlas dashboard -> Connect -> Connect your application
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/event-management?retryWrites=true&w=majority

# JWT Secret for authentication (use a strong, unique secret)
# Generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters-please-change-this

# Environment
NODE_ENV=development
```

## Generate a Secure JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## For Vercel Deployment

In your Vercel dashboard, add these environment variables:
- `MONGODB_URI`: Your Atlas connection string
- `JWT_SECRET`: Your secure JWT secret
- `NODE_ENV`: `production`

## Testing the Setup

1. Start your development server: `npm run dev`
2. Visit: `http://localhost:3000/api/test-db`
3. Should return success message if database connection works

## Next Steps

1. Set up MongoDB Atlas (see `MONGODB_SETUP.md`)
2. Create your `.env.local` file with the variables above
3. Install dependencies: `npm install`
4. Seed the database: `npm run seed`
5. Start development: `npm run dev` 