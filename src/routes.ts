import { Router, RouterContext } from "../deps.ts";
import AuthController from "./app/controllers/AuthController.ts";
import SurveyController from "./app/controllers/SurveyController.ts";

const routes = new Router();

routes.get("/", (ctx: RouterContext) => {
  ctx.response.body = "Hello, world";
});

routes.post("/api/login", AuthController.login);

routes.post("/api/register", AuthController.register);

routes.get("/api/survey", SurveyController.getAllForUser);

routes.get("/api/survey/:id", SurveyController.getSingle);

routes.post("/api/survey", SurveyController.create);

routes.put("/api/survey/:id", SurveyController.update);

routes.delete("/api/survey/:id", SurveyController.delete);

export default routes;
