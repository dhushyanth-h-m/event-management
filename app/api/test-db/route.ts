import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Event } from '@/lib/models/Event';
import { User } from '@/lib/models/User';

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();
    
    // Test connection by counting documents
    const eventCount = await Event.countDocuments();
    const userCount = await User.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        eventsCount: eventCount,
        usersCount: userCount,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Database connection failed',
        error: error.message 
      },
      { status: 500 }
    );
  }
} 