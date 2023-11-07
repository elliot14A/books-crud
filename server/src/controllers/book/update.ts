import { Request, Response } from "express";
import { UpdateBookSchema } from "../../schemas/book";
import { update as updateBook } from "../../services/book/update";
import { ApiError, ApiErrorType } from "../../error";

export async function update(
  req: Request<UpdateBookSchema["params"], any, UpdateBookSchema["body"]>,
  res: Response<any, { user: String }>,
) {
  const bookId = req.params.bookId;
  const userId = res.locals.user;
  const input = req.body;
  const bookResult = await updateBook({ _id: bookId, userId: userId }, input);
  if (bookResult.isOk) {
    return res.json(bookResult.value);
  } else {
    const err = bookResult.error;

    if (err instanceof ApiError) {
      if (err.error === ApiErrorType.NotFound) {
        return res
          .status(404)
          .json({ message: `Book with id:${bookId} is not found` });
      } else if (err.error === ApiErrorType.EntityAlreadyExist) {
        return res
          .status(409)
          .json({ message: `Book with title:${input.title} already exists` });
      }
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
}
