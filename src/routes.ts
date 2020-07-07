import { Router, RouterContext } from "../deps.ts";
import AuthController from "./app/controllers/AuthController.ts";
import SurveyController from "./app/controllers/SurveyController.ts";

const routes = new Router();

routes.get("/", (ctx: RouterContext) => {
  ctx.response.body = "Hello, world";
});

routes.post("/api/login", AuthController.login);

routes.post("/api/register", AuthController.register);

routes.get(
  "/api/survey",
  SurveyController.getAllForUser.bind(SurveyController),
);

routes.get(
  "/api/survey/:id",
  SurveyController.getSingle.bind(SurveyController),
);

routes.post("/api/survey", SurveyController.create.bind(SurveyController));

routes.put("/api/survey/:id", SurveyController.update.bind(SurveyController));

routes.delete(
  "/api/survey/:id",
  SurveyController.delete.bind(SurveyController),
);

export default routes;
