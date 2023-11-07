import mongoose from "mongoose";
import { Book } from ".";
import BookModel, { BookInput } from "../../models/book";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";

export async function create(input: BookInput): Promise<Book> {
  try {
    const book = await BookModel.create(input);
    return Result.ok(book);
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoServerError) {
      if (err.code === 11000) {
        return Result.err(
          new ApiError(
            ApiErrorType.EntityAlreadyExist,
            `book with title:${input.title} already exists`,
          ),
        );
      }
    }
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
