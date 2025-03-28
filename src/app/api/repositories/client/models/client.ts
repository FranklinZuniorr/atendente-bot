import mongoose, { Document, Schema } from "mongoose";
import { IClient } from "../interfaces";

const ClientSchema: Schema<IClient & Document> = new Schema(
  {
    telephone: { type: String, required: true },
    authCode: { type: String, required: true },
  },
  { timestamps: true }
);

const Client = mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema);

export default Client;
