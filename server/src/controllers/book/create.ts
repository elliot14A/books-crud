import { Request, Response } from "express";
import { CreateBookSchema } from "../../schemas/book";
import { create as CreateBook } from "../../services/book/create";
import { ApiError, ApiErrorType } from "../../error";

export async function create(
  req: Request<{}, {}, CreateBookSchema["body"]>,
  res: Response<{}, { user: string }>,
) {
  const userId = res.locals.user;
  const bookResult = await CreateBook({ userId: userId, ...req.body });
  if (bookResult.isOk) {
    const book = bookResult.value;
    return res.status(201).json(book);
  } else {
    const err = bookResult.error;
    if (err instanceof ApiError) {
      if (err.error === ApiErrorType.EntityAlreadyExist) {
        return res.status(409).send(err.message);
      }
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
}
