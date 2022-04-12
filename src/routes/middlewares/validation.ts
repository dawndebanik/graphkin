import { Context } from "koa";
import { HttpStatusCodes } from "../../constants";

export const validateDbName = async (
  ctx: Context,
  next: () => Promise<any>
) => {
  const { dbName } = ctx.request.body;
  if (!dbName || typeof dbName !== "string") {
    ctx.body = "dbName should be of type string";
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }
  await next();
};

export const validateGraphName = async (
  ctx: Context,
  next: () => Promise<any>
) => {
  const { graphName } = ctx.request.body;
  if (!graphName || typeof graphName !== "string") {
    ctx.body = "graphName should be of type string";
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }
  await next();
};
