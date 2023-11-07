import { details } from "../../services/session/details";
import { Claims } from "../../utils/jwt";

export async function validSession(payload: Claims): Promise<boolean> {
  const { sessionId, userId }: Claims = payload;
  const sessionResult = await details({ _id: sessionId, userId: userId });
  if (sessionResult.isErr) {
    return false;
  }
  const { valid } = sessionResult.value;
  if (!valid) {
    return false;
  }
  return true;
}
