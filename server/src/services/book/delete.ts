import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";
import BookModel, { BookDocument } from "../../models/book";
import { FilterQuery } from "mongoose";

export async function Delete(
  query: FilterQuery<BookDocument>,
): Promise<Result<void>> {
  try {
    const queryBook = BookModel.where(query);
    const book = await queryBook.findOneAndDelete();
    if (!book)
      return Result.err(
        new ApiError(ApiErrorType.NotFound, "Session not found"),
      );

    return Result.ok(undefined);
  } catch (err) {
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
