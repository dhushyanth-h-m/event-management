import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin' | 'organizer';
  profileImage?: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true,
      index: true 
    },
    password: { 
      type: String, 
      required: true,
      minlength: 8,
      select: false // Don't include password by default in queries
    },
    name: { 
      type: String, 
      required: true,
      trim: true,
      index: true 
    },
    role: { 
      type: String, 
      enum: ['user', 'admin', 'organizer'], 
      default: 'user',
      index: true 
    },
    profileImage: { 
      type: String 
    }
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create index for better performance
UserSchema.index({ email: 1, role: 1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User; 