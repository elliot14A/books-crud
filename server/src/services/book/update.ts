import mongoose, { FilterQuery, UpdateQuery } from "mongoose";
import BookModel, { BookDocument } from "../../models/book";
import { Book } from ".";
import { ApiError, ApiErrorType } from "../../error";
import { Result } from "@badrap/result";

export async function update(
  query: FilterQuery<BookDocument>,
  update: UpdateQuery<BookDocument>,
): Promise<Book> {
  try {
    const book = await BookModel.findOneAndUpdate(query, update, { new: true });
    if (!book) {
      return Result.err(
        new ApiError(ApiErrorType.NotFound, "Session not found"),
      );
    }
    return Result.ok(book);
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoServerError) {
      if (err.code === 11000) {
        return Result.err(
          new ApiError(
            ApiErrorType.EntityAlreadyExist,
            `book with title:${query.title} already exists`,
          ),
        );
      }
    }
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
