import { ENVS } from '@/constants';
import mongoose from 'mongoose';

const MONGO_URI = ENVS.mongoUrl;

if (!MONGO_URI) {
  throw new Error('⚠️ MONGO_URI não foi definida no .env');
}

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) {
  }

  await mongoose.connect(MONGO_URI);
};
