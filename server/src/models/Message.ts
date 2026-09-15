import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  username: string;
  message: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model<IMessage>(
  "Message",
  messageSchema
);