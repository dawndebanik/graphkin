import Router from "koa-router";
import { Context } from "koa";
import DomainFs from "../persistance/domain-fs";
import { HttpStatusCodes } from "../constants";
import { validateDbName, validateGraphName } from "./middlewares/validation";

const createRouter: Router = new Router({ prefix: "/create" });

// TODO: maybe expose the methods from DomainFs as static
const domainFs = new DomainFs();

/**
 * Method: POST
 * Endpoint: <base_url>/create/database
 * Body: { dbName: "<db_name>" }
 */
createRouter.post("/database", validateDbName, async (ctx: Context) => {
  try {
    const { dbName } = ctx.request.body;
    const resp = await domainFs.createDBIfNotExists(dbName);
    if (resp) {
      ctx.body = "Database Created";
      ctx.status = HttpStatusCodes.CREATED;
      return;
    }

    ctx.body = "DataBase already exists";
    ctx.status = HttpStatusCodes.OK_200;
  } catch (err: any) {
    ctx.body = err.message;
    ctx.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  }
});

/**
 * Method: POST
 * Endpoint: <base_url>/create/graph
 * Body: { dbName: "<db_name>", graphName: "<graph_name>" }
 */
createRouter.post(
  "/graph",
  validateDbName,
  validateGraphName,
  async (ctx: Context) => {
    try {
      const { dbName, graphName } = ctx.request.body;
      const resp = await domainFs.createGraphIfNotExists(dbName, graphName);
      if (resp) {
        ctx.body = "Graph Created";
        ctx.status = HttpStatusCodes.CREATED;
        return;
      }

      ctx.body = "Graph already exists";
      ctx.status = HttpStatusCodes.OK_200;
    } catch (err: any) {
      ctx.body = err.message;
      ctx.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    }
  }
);

export default createRouter;
