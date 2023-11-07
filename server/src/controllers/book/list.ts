import { Request, Response } from "express";
import { list as listMovies } from "../../services/book/list";

export async function list(_: Request, res: Response<any, { user: string }>) {
  const userId = res.locals.user;
  const booksResult = await listMovies({ userId: userId });
  if (booksResult.isOk) {
    const books = booksResult.value;
    return res.json(books);
  } else {
    return res.send(500).json({ message: "Something went wrong" });
  }
}
