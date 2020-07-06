import { Router, RouterContext } from "../deps.ts";

const routes = new Router();

routes.get("/", (ctx: RouterContext) => {
  ctx.response.body = "Hello, world";
});

export default routes;
