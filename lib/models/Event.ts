import mongoose, { Schema, Document, Types } from 'mongoose';

// TimeSlot interface
export interface TimeSlot {
  startTime: Date;
  endTime: Date;
  title: string;
  description?: string;
}

// Event interface
export interface IEvent extends Document {
  title: string;
  description: string;
  organizer: Types.ObjectId;
  participants: Types.ObjectId[];
  schedules: TimeSlot[];
  location: {
    name: string;
    address?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  startDate: Date;
  endDate: Date;
  liveStatus: 'draft' | 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

// TimeSlot schema
const TimeSlotSchema = new Schema<TimeSlot>({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String }
});

// Event schema
const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
    schedules: [TimeSlotSchema],
    location: {
      name: { type: String, required: true },
      address: { type: String },
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number }
      }
    },
    startDate: { type: Date, required: true, index: true },
    endDate: { type: Date, required: true, index: true },
    liveStatus: { 
      type: String, 
      enum: ['draft', 'active', 'archived'], 
      default: 'draft',
      index: true 
    }
  },
  { timestamps: true }
);

// Create compound indexes for optimized queries
EventSchema.index({ organizer: 1, startDate: 1 });
EventSchema.index({ liveStatus: 1, startDate: 1 });

// Use mongoose.models to prevent model overwrite error in Next.js HMR
export const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event; 