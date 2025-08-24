import mongoose, { Document, Schema } from 'mongoose';
import { UserActivity } from '../interfaces';

const UserActivitySchema: Schema<UserActivity & Document> = new Schema(
  {
    isEnabled: { type: Boolean, required: true },
    name: { type: String, required: true },
    clientId: { type: String, required: true },
    telephone: { type: String, required: true }
  },
  { timestamps: true }
);

const UserActivityModel = mongoose.models.UserActivity || mongoose.model<UserActivity>('UserActivity', UserActivitySchema);

export default UserActivityModel;
