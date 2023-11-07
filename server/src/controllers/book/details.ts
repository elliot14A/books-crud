import { Request, Response } from "express";
import { GetBookById } from "../../schemas/book";
import { details as BookDetails } from "../../services/book/details";
import { ApiError, ApiErrorType } from "../../error";

export async function details(
  req: Request<GetBookById["params"]>,
  res: Response<any, { user: string }>,
) {
  const bookId = req.params.bookId;
  const userId = res.locals.user;

  const bookResult = await BookDetails({ _id: bookId, userId: userId });

  if (bookResult.isOk) {
    const book = bookResult.value;
    return res.json(book);
  } else {
    const err = bookResult.error;
    if (err instanceof ApiError) {
      if (err.error === ApiErrorType.NotFound) {
        return res
          .status(404)
          .json({ message: `Book with id:${bookId} is not found` });
      }
    }
    return res.status(500).json({ message: "Something not found" });
  }
}
