import mongoose from "mongoose";
import { UserDocument } from "./user";

export interface BookInput {
  title: string;
  author: string;
  summary: string;
  userId: UserDocument["_id"];
}

export interface BookDocument extends BookInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new mongoose.Schema<BookDocument>(
  {
    title: { type: String, unique: true, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

const BookModel = mongoose.model<BookDocument>("Book", bookSchema);
export default BookModel;
