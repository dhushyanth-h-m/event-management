'use client';

import React, { useState } from 'react';

// Sample user data
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'organizer', status: 'active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', status: 'active' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'organizer', status: 'inactive' },
  { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'user', status: 'active' }
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState(initialUsers);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gradient">Admin Panel</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="-mb-px flex">
            <button
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              System Settings
            </button>
            <button
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'logs'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
              }`}
              onClick={() => setActiveTab('logs')}
            >
              Activity Logs
            </button>
          </nav>
        </div>
        
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-blue-400">User Management</h2>
              <button className="btn-primary">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add User
                </span>
              </button>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-lg font-medium text-white">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                          user.role === 'organizer' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-400 hover:text-blue-300 mr-3">
                          Edit
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-6">System Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-lg font-medium mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      className="bg-gray-700 border border-gray-600 rounded-md w-full px-3 py-2 text-white"
                      defaultValue="Event Management Platform"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      className="bg-gray-700 border border-gray-600 rounded-md w-full px-3 py-2 text-white"
                      defaultValue="admin@events.com"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="enableRegistration"
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 rounded border-gray-600 bg-gray-700"
                      defaultChecked
                    />
                    <label htmlFor="enableRegistration" className="ml-2 block text-sm text-gray-300">
                      Enable user registration
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="enableEmail"
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 rounded border-gray-600 bg-gray-700"
                      defaultChecked
                    />
                    <label htmlFor="enableEmail" className="ml-2 block text-sm text-gray-300">
                      Email notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="enablePush"
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 rounded border-gray-600 bg-gray-700"
                      defaultChecked
                    />
                    <label htmlFor="enablePush" className="ml-2 block text-sm text-gray-300">
                      Push notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="enableSMS"
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 rounded border-gray-600 bg-gray-700"
                    />
                    <label htmlFor="enableSMS" className="ml-2 block text-sm text-gray-300">
                      SMS notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        )}
        
        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-6">Activity Logs</h2>
            
            <div className="card">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <LogItem 
                  type="user" 
                  message="User John Doe logged in" 
                  time="Today, 10:35 AM" 
                />
                <LogItem 
                  type="event" 
                  message="Event 'Tech Conference 2025' was created" 
                  time="Today, 9:42 AM" 
                />
                <LogItem 
                  type="system" 
                  message="System backup completed successfully" 
                  time="Today, 3:00 AM" 
                />
                <LogItem 
                  type="error" 
                  message="Failed login attempt from IP 192.168.1.12" 
                  time="Yesterday, 8:41 PM" 
                />
                <LogItem 
                  type="event" 
                  message="Event 'Product Launch' was updated" 
                  time="Yesterday, 4:23 PM" 
                />
                <LogItem 
                  type="user" 
                  message="New user Sarah Williams registered" 
                  time="Yesterday, 1:12 PM" 
                />
                <LogItem 
                  type="system" 
                  message="System updated to version 2.4.1" 
                  time="Yesterday, 9:00 AM" 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LogItem({ type, message, time }: { type: 'user' | 'event' | 'system' | 'error'; message: string; time: string }) {
  const getTypeStyles = () => {
    switch (type) {
      case 'user':
        return "bg-blue-500/20 text-blue-300 border-blue-500";
      case 'event':
        return "bg-purple-500/20 text-purple-300 border-purple-500";
      case 'system':
        return "bg-green-500/20 text-green-300 border-green-500";
      case 'error':
        return "bg-red-500/20 text-red-300 border-red-500";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500";
    }
  };
  
  const getIcon = () => {
    switch (type) {
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      case 'event':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      case 'system':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v8H5V6zm6 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  return (
    <div className={`p-3 rounded border-l-4 ${getTypeStyles()} bg-gray-800/50`}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="mr-2">{getIcon()}</span>
          <p>{message}</p>
        </div>
        <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{time}</span>
      </div>
    </div>
  );
} 