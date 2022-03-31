import Koa from "koa";
import bodyParser from "koa-bodyparser";
import createRouter from "./createRoutes";

const app = new Koa();
const PORT = process.env.PORT || 8080;

app
    .use(bodyParser())
    .use(createRouter.routes())
    .use(createRouter.allowedMethods());

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
