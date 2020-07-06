import { Router, RouterContext } from "../deps.ts";
import AuthController from "./app/controllers/AuthController.ts";
const routes = new Router();

routes.get("/", (ctx: RouterContext) => {
  ctx.response.body = "Hello, world";
});

routes.post("/api/login", AuthController.login);

routes.post("/api/register", AuthController.register);

export default routes;
