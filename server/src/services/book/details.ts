import { FilterQuery } from "mongoose";
import BookModel, { BookDocument } from "../../models/book";
import { Book } from ".";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";

export async function details(query: FilterQuery<BookDocument>): Promise<Book> {
  try {
    const queryBook = BookModel.where(query);
    const book = await queryBook.findOne();
    if (!book) {
      return Result.err(new ApiError(ApiErrorType.NotFound, "Book not found"));
    }
    return Result.ok(book);
  } catch (err) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
