import mongoose from 'mongoose';
import { ENVS } from '@/constants';

const MONGO_URI = ENVS.mongoUrl;

if (!MONGO_URI) {
  throw new Error('⚠️ MONGO_URI não foi definida no .env');
}

type MongooseGlobal = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as {
  mongoose: MongooseGlobal;
};

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (globalForMongoose.mongoose.conn) return;

  if (!globalForMongoose.mongoose.promise) {
    globalForMongoose.mongoose.promise = mongoose.connect(MONGO_URI || '', {
      bufferCommands: false,
      maxPoolSize: 10,
    });
  }

  globalForMongoose.mongoose.conn =
    await globalForMongoose.mongoose.promise;
}

