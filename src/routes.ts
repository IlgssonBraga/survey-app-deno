import { Router, RouterContext } from "../deps.ts";
import AuthController from "./app/controllers/AuthController.ts";
import SurveyController from "./app/controllers/SurveyController.ts";
import { authMiddleware } from "./app/middlewares/authMiddleware.ts";

const routes = new Router();

routes.get("/", (ctx: RouterContext) => {
  ctx.response.body = "Hello, world";
});

routes.post("/api/login", AuthController.login);

routes.post("/api/register", AuthController.register);

routes.get(
  "/api/survey",
  authMiddleware,
  SurveyController.getAllForUser.bind(SurveyController),
);

routes.get(
  "/api/survey/:id",
  authMiddleware,
  SurveyController.getSingle.bind(SurveyController),
);

routes.post(
  "/api/survey",
  authMiddleware,
  SurveyController.create.bind(SurveyController),
);

routes.put(
  "/api/survey/:id",
  authMiddleware,
  SurveyController.update.bind(SurveyController),
);

routes.delete(
  "/api/survey/:id",
  authMiddleware,
  SurveyController.delete.bind(SurveyController),
);

export default routes;
