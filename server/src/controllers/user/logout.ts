import { Request, Response } from "express";
import { Delete } from "../../services/session/delete";
import cookie from "cookie";
import { TokenType, verifyJwt } from "../../utils/jwt";
import { validSession } from "../session";

export default async function logout(
  req: Request,
  res: Response<any, { user: string }>,
) {
  const UserId = res.locals.user;
  const cookies = req.headers.cookie;
  if (!cookies) return res.status(401);
  const cookieJson = cookie.parse(cookies);
  const accessToken = cookieJson["accessToken"];
  const refreshToken = cookieJson["refreshToken"];

  const { decoded: AccessDecoded } = verifyJwt(
    accessToken,
    TokenType.AccessToken,
  );
  const { decoded: RefreshDecoded } = verifyJwt(
    refreshToken,
    TokenType.RefreshToken,
  );
  if (!AccessDecoded || !RefreshDecoded) return res.sendStatus(401);
  const valid =
    (await validSession(AccessDecoded)) && (await validSession(RefreshDecoded));

  if (!valid) return res.sendStatus(401);

  Promise.all([
    await Delete({
      _id: RefreshDecoded.sessionId,
      userId: UserId,
    }),
    await Delete({
      _id: AccessDecoded.sessionId,
      userId: UserId,
    }),
  ]);

  return res.status(200).send({ message: "logout successful" });
}
