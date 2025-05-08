import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User } from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, action } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Login action
    if (action === 'login') {
      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Create JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      return NextResponse.json({
        success: true,
        user: userResponse,
        token
      });
    }
    
    // Register action
    if (action === 'register') {
      // Check if user exists
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        return NextResponse.json(
          { success: false, message: 'User already exists' },
          { status: 400 }
        );
      }

      const { name, role = 'user' } = body;
      
      if (!name) {
        return NextResponse.json(
          { success: false, message: 'Name is required' },
          { status: 400 }
        );
      }

      // Create new user
      const user = await User.create({
        email,
        password,
        name,
        role
      });

      // Create JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      return NextResponse.json({
        success: true,
        user: userResponse,
        token
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 