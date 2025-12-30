import mongoose from 'mongoose';
import { ENVS } from '@/constants';

const MONGO_URI = ENVS.mongoUrl;

if (!MONGO_URI) {
  throw new Error('⚠️ MONGO_URI não foi definida no .env');
}

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(MONGO_URI);
  isConnected = true;
};
