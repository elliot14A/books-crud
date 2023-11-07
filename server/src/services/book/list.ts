import { FilterQuery } from "mongoose";
import BookModel, { BookDocument } from "../../models/book";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";

export async function list(
  query: FilterQuery<BookDocument>,
): Promise<Result<BookDocument[]>> {
  try {
    const queryBooks = BookModel.where(query);
    const books = await queryBooks.find();
    return Result.ok(books);
  } catch (e) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
