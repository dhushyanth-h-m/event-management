'use client';

import React, { useState } from 'react';

// Sample event data
const initialEvents = [
  {
    id: 'evt-001',
    title: 'Tech Conference 2025',
    startDate: '2025-06-01',
    endDate: '2025-06-03',
    location: 'San Francisco Convention Center',
    organizer: 'John Doe',
    status: 'active',
    participants: 247
  },
  {
    id: 'evt-002',
    title: 'Product Launch',
    startDate: '2025-07-15',
    endDate: '2025-07-15',
    location: 'Virtual',
    organizer: 'Jane Smith',
    status: 'draft',
    participants: 124
  },
  {
    id: 'evt-003',
    title: 'Annual Retreat',
    startDate: '2025-08-21',
    endDate: '2025-08-24',
    location: 'Mountain Resort',
    organizer: 'Michael Johnson',
    status: 'active',
    participants: 52
  },
  {
    id: 'evt-004',
    title: 'Design Workshop',
    startDate: '2025-05-15',
    endDate: '2025-05-16',
    location: 'Creative Hub',
    organizer: 'Sarah Williams',
    status: 'active',
    participants: 18
  },
  {
    id: 'evt-005',
    title: 'Team Building',
    startDate: '2025-09-05',
    endDate: '2025-09-05',
    location: 'Adventure Park',
    organizer: 'Robert Brown',
    status: 'draft',
    participants: 35
  }
];

export default function Events() {
  const [events, setEvents] = useState(initialEvents);
  const [filter, setFilter] = useState('all');

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.status === filter);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gradient">Event Management</h1>
          <button className="btn-primary">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Event
            </span>
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setFilter('all')}
          >
            All Events
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${filter === 'draft' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setFilter('draft')}
          >
            Draft
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${filter === 'archived' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setFilter('archived')}
          >
            Archived
          </button>
        </div>

        {/* Events Table */}
        <div className="overflow-hidden rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Organizer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Participants
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{event.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {event.startDate === event.endDate 
                        ? event.startDate
                        : `${event.startDate} - ${event.endDate}`
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{event.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{event.organizer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      event.status === 'active' ? 'bg-green-100 text-green-800' : 
                      event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {event.participants}
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

        {filteredEvents.length === 0 && (
          <div className="bg-gray-800/50 rounded-lg p-8 text-center mt-4">
            <p className="text-gray-400">No events found matching your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
} 