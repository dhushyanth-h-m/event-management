import { NextRequest } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';
import { Server as NetServer } from 'http';
import connectDB from '@/lib/db';
import { Event } from '@/lib/models/Event';
import { verifyJWT } from '@/lib/utils/auth';

// Store active WebSocket connections
let io: SocketIOServer | null = null;

// MongoDB change stream
let changeStream: any = null;

// Initialize WebSocket server and MongoDB change stream
async function initWebSocketServer(req: NextRequest, res: any) {
  // If server is already initialized, return
  if (io) return io;

  // Connect to MongoDB
  await connectDB();

  // Create new Socket.IO server
  const httpServer = res.socket.server as NetServer;
  io = new SocketIOServer(httpServer, {
    path: '/api/ws',
    addTrailingSlash: false,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // Setup Socket.IO connection handler
  io.on('connection', async (socket) => {
    console.log('Client connected:', socket.id);

    // Handle authentication
    socket.on('authenticate', async (token) => {
      try {
        // Create a fake request to use the verifyJWT function
        const mockRequest = {
          headers: {
            get: () => `Bearer ${token}`,
          },
        } as NextRequest;

        const authResult = await verifyJWT(mockRequest);
        
        if (authResult.success) {
          // Associate user with socket
          socket.data.user = authResult.user;
          socket.emit('auth_success', { user: authResult.user });
          
          // Join appropriate rooms based on user role
          socket.join(`user:${authResult.user.id}`);
          socket.join(`role:${authResult.user.role}`);
          
          console.log(`User ${authResult.user.email} authenticated`);
        } else {
          socket.emit('auth_error', { message: authResult.message });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        socket.emit('auth_error', { message: 'Authentication failed' });
      }
    });

    // Handle event subscription
    socket.on('subscribe_to_event', (eventId) => {
      if (!socket.data.user) {
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      
      // Join event-specific room
      socket.join(`event:${eventId}`);
      console.log(`User ${socket.data.user.id} subscribed to event ${eventId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Initialize MongoDB change stream for real-time updates
  if (!changeStream) {
    const eventCollection = Event.collection;
    
    changeStream = eventCollection.watch();
    
    changeStream.on('change', (change: any) => {
      console.log('Change detected:', change.operationType);
      
      if (change.operationType === 'insert') {
        // New event created
        io?.emit('event_created', change.fullDocument);
      } else if (change.operationType === 'update') {
        // Event updated
        const eventId = change.documentKey._id.toString();
        
        // Emit to event-specific room
        io?.to(`event:${eventId}`).emit('event_updated', {
          eventId,
          updatedFields: change.updateDescription.updatedFields,
        });
      } else if (change.operationType === 'delete') {
        // Event deleted
        const eventId = change.documentKey._id.toString();
        io?.emit('event_deleted', { eventId });
      }
    });
    
    console.log('MongoDB change stream initialized');
  }

  return io;
}

export async function GET(req: NextRequest, res: any) {
  // This route doesn't return a response directly
  // It's used for WebSocket upgrade
  await initWebSocketServer(req, res);
  
  // Return empty response to keep the connection open
  return new Response(null, { status: 200 });
} 