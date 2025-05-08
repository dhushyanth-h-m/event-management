'use client';

import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gradient">Live Dashboard</h1>
        
        {/* Connection Status */}
        <div className="mb-6 p-3 bg-gray-800 border border-gray-700 rounded-lg">
          <p className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full mr-2 bg-green-500 animate-pulse-subtle"></span>
            <span>Connected to real-time server</span>
          </p>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Events" value="24" change="+3" />
          <StatCard title="Participants" value="1,842" change="+156" />
          <StatCard title="Today's Events" value="7" change="+2" />
          <StatCard title="Messages" value="138" change="+12" />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Event Activity</h2>
            <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
              <p className="text-gray-400">Chart visualization placeholder</p>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Participants by Event</h2>
            <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
              <p className="text-gray-400">Chart visualization placeholder</p>
            </div>
          </div>
        </div>
        
        {/* Recent Updates */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-400">Real-time Updates</h2>
            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Live</span>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            <UpdateItem 
              type="new" 
              message="New event 'Tech Conference 2025' created by John Doe" 
              time="Just now" 
            />
            <UpdateItem 
              type="update" 
              message="'Product Launch' event updated: 45 new participants added" 
              time="2 min ago" 
            />
            <UpdateItem 
              type="delete" 
              message="Event 'Team Meeting' cancelled by admin" 
              time="15 min ago" 
            />
            <UpdateItem 
              type="update" 
              message="'Annual Retreat' event location changed to 'Mountain Resort'" 
              time="1 hour ago" 
            />
            <UpdateItem 
              type="new" 
              message="New event 'Design Workshop' created by Jane Smith" 
              time="3 hours ago" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="card">
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <div className="flex items-end justify-between mt-2">
        <p className="text-3xl font-bold">{value}</p>
        <p className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </p>
      </div>
    </div>
  );
}

function UpdateItem({ type, message, time }: { type: 'new' | 'update' | 'delete'; message: string; time: string }) {
  const getTypeStyles = () => {
    switch (type) {
      case 'new':
        return "bg-green-500/20 text-green-300 border-green-500";
      case 'update':
        return "bg-blue-500/20 text-blue-300 border-blue-500";
      case 'delete':
        return "bg-red-500/20 text-red-300 border-red-500";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500";
    }
  };
  
  return (
    <div className={`p-3 rounded border-l-4 ${getTypeStyles()} bg-gray-800/50`}>
      <div className="flex justify-between">
        <p>{message}</p>
        <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{time}</span>
      </div>
    </div>
  );
} 