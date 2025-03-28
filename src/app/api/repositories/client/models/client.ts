import mongoose, { Document, Schema } from "mongoose";
import { Client } from "../interfaces";

const ClientSchema: Schema<Client & Document> = new Schema(
  {
    telephone: { type: String, required: true },
    authCode: { type: String, required: true },
  },
  { timestamps: true }
);

const ClientModel = mongoose.models.Client || mongoose.model<Client>("Client", ClientSchema);

export default ClientModel;
