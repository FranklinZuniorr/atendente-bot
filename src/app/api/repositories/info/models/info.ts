import mongoose, { Document, Schema } from 'mongoose';
import { Info } from '../interfaces';

const InfoSchema: Schema<Info & Document> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    clientId:{ type: String, required: true },
  },
  { timestamps: true }
);

const InfoModel = mongoose.models.Info || mongoose.model<Info>('Info', InfoSchema);

export default InfoModel;
