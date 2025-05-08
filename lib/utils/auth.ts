import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JWTPayload {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'organizer';
  iat: number;
  exp: number;
}

export async function verifyJWT(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { success: false, message: 'No token provided' };
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return { success: false, message: 'Invalid token format' };
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    return { 
      success: true, 
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      }
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return { success: false, message: 'Invalid token' };
  }
} 