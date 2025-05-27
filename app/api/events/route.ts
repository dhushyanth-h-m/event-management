import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Event } from '@/lib/models/Event';
import { verifyJWT } from '@/lib/utils/auth';

// GET handler for fetching events
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const organizerId = searchParams.get('organizer');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    await connectDB();

    // Build query based on parameters
    let query: any = {};
    
    if (status) {
      query.liveStatus = status;
    }
    
    if (organizerId) {
      query.organizer = organizerId;
    }

    // Get total count for pagination
    const total = await Event.countDocuments(query);
    
    // Fetch events with pagination
    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .sort({ startDate: 1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      events,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Fetch events error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// POST handler for creating a new event
export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const authResult = await verifyJWT(request);
    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = authResult.user;
    
    // Only organizers and admins can create events
    if (user.role !== 'organizer' && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Not authorized to create events' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.startDate || !body.endDate) {
      return NextResponse.json(
        { success: false, message: 'Title, start date, and end date are required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Create event with current user as organizer
    const event = await Event.create({
      ...body,
      organizer: user.id,
      liveStatus: body.liveStatus || 'draft'
    });
    
    // Populate organizer details
    await event.populate('organizer', 'name email');
    
    return NextResponse.json({
      success: true,
      event
    }, { status: 201 });
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 