import mongoose, { Document, Schema } from 'mongoose';
import { AffiliateSell } from '../interfaces';

const AffiliateSellSchema: Schema<AffiliateSell & Document> = new Schema(
  {
    value: { type: Number, required: true },
    invoiceId: { type: String, required: true },
    affiliateId: { type: String, ref: 'Client', required: true },
    client: {
      clientId: { type: String, ref: 'Client', required: true },
      name: { type: String, required: true },
      telephone: { type: String, required: true },
    }
  },
  { timestamps: true }
);

const AffiliateSellModel = mongoose.models.AffiliateSell || mongoose.model<AffiliateSell>('AffiliateSell', AffiliateSellSchema);

export default AffiliateSellModel;
