import { Request, Response } from "express";
import { DeleteBookById } from "../../schemas/book";
import { Delete as deleteBook } from "../../services/book/delete";
import { ApiError, ApiErrorType } from "../../error";

export async function Delete(
  req: Request<DeleteBookById["params"]>,
  res: Response<any, { user: string }>,
) {
  const bookId = req.params.bookId;
  const userId = res.locals.user;
  const bookResult = await deleteBook({ _id: bookId, userId: userId });
  if (bookResult.isOk) {
    return res.json({ message: `Book with id:${bookId} is deleted` });
  } else {
    const err = bookResult.error;
    if (err instanceof ApiError) {
      if (err.error === ApiErrorType.NotFound) {
        return res
          .status(404)
          .json({ message: `Book with id:${bookId} is not found` });
      }
    }
    return res.status(500).send({ message: "Something went wrong" });
  }
}
