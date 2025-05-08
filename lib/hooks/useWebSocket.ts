import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  role: string;
}

interface WebSocketState {
  socket: Socket | null;
  isConnected: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

export default function useWebSocket(token: string | null) {
  const router = useRouter();
  const [state, setState] = useState<WebSocketState>({
    socket: null,
    isConnected: false,
    isAuthenticated: false,
    user: null,
    error: null,
  });

  // Connect to WebSocket server
  useEffect(() => {
    if (!token) return;

    const socket = io({
      path: '/api/ws',
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Handle connect event
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setState(prev => ({ ...prev, socket, isConnected: true, error: null }));
      
      // Authenticate with token
      socket.emit('authenticate', token);
    });

    // Handle authentication success
    socket.on('auth_success', ({ user }) => {
      console.log('Authentication successful', user);
      setState(prev => ({ ...prev, isAuthenticated: true, user }));
    });

    // Handle authentication error
    socket.on('auth_error', ({ message }) => {
      console.error('Authentication error:', message);
      setState(prev => ({ ...prev, error: message, isAuthenticated: false }));
      
      // Redirect to login on auth error
      router.push('/login');
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setState(prev => ({ ...prev, isConnected: false }));
    });

    // Handle errors
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setState(prev => ({ ...prev, error: 'Failed to connect to server', isConnected: false }));
    });

    // Clean up on unmount
    return () => {
      console.log('Cleaning up WebSocket connection');
      socket.disconnect();
    };
  }, [token, router]);

  // Subscribe to specific event updates
  const subscribeToEvent = useCallback((eventId: string) => {
    if (state.socket && state.isAuthenticated) {
      state.socket.emit('subscribe_to_event', eventId);
    }
  }, [state.socket, state.isAuthenticated]);

  // Listen for specific event types
  const addEventListener = useCallback((eventName: string, callback: (data: any) => void) => {
    if (state.socket) {
      state.socket.on(eventName, callback);
      
      // Return cleanup function
      return () => {
        state.socket?.off(eventName, callback);
      };
    }
    
    // Return no-op function if no socket
    return () => {};
  }, [state.socket]);

  return {
    ...state,
    subscribeToEvent,
    addEventListener,
  };
} 