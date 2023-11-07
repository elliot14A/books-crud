import { Result } from "@badrap/result";
import { BookDocument } from "../../models/book";

export type Book = Result<BookDocument>;
