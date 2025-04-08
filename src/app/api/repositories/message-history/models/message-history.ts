import mongoose, { Document, Schema } from 'mongoose';
import { MessageHistory } from '../interfaces';

const MessageHistorySchema: Schema<MessageHistory & Document> = new Schema(
  {
    replyMessage: { type: String, required: true },
    receivedMessage: { type: String, required: true },
    clientId: { type: String, required: true },
    user: { type: String, required: true }
  },
  { 
    timestamps: true, 
  }
);

MessageHistorySchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 10 });
const MessageHistoryModel = mongoose.models.MessageHistory || mongoose.model<MessageHistory>('MessageHistory', MessageHistorySchema);

MessageHistoryModel.createIndexes();

export default MessageHistoryModel;
