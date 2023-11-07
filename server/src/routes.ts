import express from "express";
import { validate } from "./middleware/validate";
import { createUserSchema, loginUserSchema } from "./schemas/user";
import { register } from "./controllers/user/register";
import { login } from "./controllers/user/login";
import logout from "./controllers/user/logout";
import {
  createBookSchema,
  deleteBookSchema,
  getBookByIdSchema,
  updateBookSchema,
} from "./schemas/book";
import { list as listBooksHandler } from "./controllers/book/list";
import { create as createBookHandler } from "./controllers/book/create";
import { details as bookDetailsHandler } from "./controllers/book/details";
import { update as updateBookHandler } from "./controllers/book/update";
import { Delete as deleteBookHandler } from "./controllers/book/delete";
import { authGuard } from "./middleware/authGuard";
import { whoami } from "./controllers/session/whoami";

function authRouter(): express.Router {
  const router = express.Router();
  router.post("/register", validate(createUserSchema), register);
  router.post("/login", validate(loginUserSchema), login);
  router.post("/logout", logout);
  return router;
}

function sessionRouter(): express.Router {
  const router = express.Router();
  router.get("/whoami", whoami);
  return router;
}

function bookRouter(): express.Router {
  const router = express.Router();
  router.get("/", authGuard, listBooksHandler);
  router.post("/", authGuard, validate(createBookSchema), createBookHandler);
  router.get(
    "/:bookId",
    authGuard,
    validate(getBookByIdSchema),
    bookDetailsHandler,
  );
  router.patch(
    "/:bookId",
    authGuard,
    validate(updateBookSchema),
    updateBookHandler,
  );
  router.delete(
    "/:bookId",
    authGuard,
    validate(deleteBookSchema),
    deleteBookHandler,
  );
  return router;
}

export function routes(): express.Router {
  const router = express.Router();
  router.use("/auth", authRouter());
  router.use("/books", bookRouter());
  router.use("/sessions", sessionRouter());
  router.get("/health", (_, res) => {
    return res.sendStatus(200);
  });
  return router;
}
