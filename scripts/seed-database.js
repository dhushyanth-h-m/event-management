// Database seeding script
// Run with: node scripts/seed-database.js

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Simple schemas for seeding
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'organizer'], default: 'user' }
}, { timestamps: true });

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  schedules: [{
    startTime: Date,
    endTime: Date,
    title: String,
    description: String
  }],
  location: {
    name: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  liveStatus: { type: String, enum: ['draft', 'active', 'archived'], default: 'draft' }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

// Sample data
const sampleUsers = [
  {
    email: 'admin@example.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    email: 'organizer@example.com',
    password: 'password123',
    name: 'Event Organizer',
    role: 'organizer'
  },
  {
    email: 'user@example.com',
    password: 'password123',
    name: 'Regular User',
    role: 'user'
  }
];

const sampleEvents = [
  {
    title: 'Tech Conference 2024',
    description: 'Annual technology conference featuring the latest innovations in software development.',
    location: {
      name: 'Convention Center',
      address: '123 Main St, Tech City',
      coordinates: { latitude: 37.7749, longitude: -122.4194 }
    },
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-06-17'),
    liveStatus: 'active',
    schedules: [
      {
        startTime: new Date('2024-06-15T09:00:00Z'),
        endTime: new Date('2024-06-15T10:30:00Z'),
        title: 'Opening Keynote',
        description: 'Welcome and introduction to the conference'
      },
      {
        startTime: new Date('2024-06-15T11:00:00Z'),
        endTime: new Date('2024-06-15T12:00:00Z'),
        title: 'AI in Modern Development',
        description: 'How AI is transforming software development'
      }
    ]
  },
  {
    title: 'Community Meetup',
    description: 'Monthly community meetup for developers to network and share knowledge.',
    location: {
      name: 'Local Library',
      address: '456 Oak Ave, Dev Town'
    },
    startDate: new Date('2024-05-20'),
    endDate: new Date('2024-05-20'),
    liveStatus: 'active',
    schedules: [
      {
        startTime: new Date('2024-05-20T18:00:00Z'),
        endTime: new Date('2024-05-20T21:00:00Z'),
        title: 'Networking & Presentations',
        description: 'Open networking and lightning talks'
      }
    ]
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Event.deleteMany({});

    // Create users
    console.log('Creating sample users...');
    const createdUsers = await User.create(sampleUsers);
    console.log(`Created ${createdUsers.length} users`);

    // Assign organizer to events
    sampleEvents[0].organizer = createdUsers[1]._id; // Organizer
    sampleEvents[1].organizer = createdUsers[1]._id; // Organizer
    
    // Add some participants
    sampleEvents[0].participants = [createdUsers[2]._id]; // Regular user
    sampleEvents[1].participants = [createdUsers[0]._id, createdUsers[2]._id]; // Admin and user

    // Create events
    console.log('Creating sample events...');
    const createdEvents = await Event.create(sampleEvents);
    console.log(`Created ${createdEvents.length} events`);

    console.log('✅ Database seeded successfully!');
    console.log('\nSample login credentials:');
    console.log('Admin: admin@example.com / password123');
    console.log('Organizer: organizer@example.com / password123');
    console.log('User: user@example.com / password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase(); 