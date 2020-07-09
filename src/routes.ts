import { Router } from "../deps.ts";
import AuthController from "./app/controllers/AuthController.ts";
import SurveyController from "./app/controllers/SurveyController.ts";
import QuestionController from "./app/controllers/QuestionController.ts";
import { authMiddleware } from "./app/middlewares/authMiddleware.ts";
import SiteController from "./app/controllers/SiteController.ts";

const routes = new Router();

routes.get("/", SiteController.surveys);

routes.get("/survey:id", SiteController.viewSurvey);

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

// questions

routes.get(
  "/api/survey/:surveyId/questions",
  authMiddleware,
  QuestionController.getBySurvey.bind(QuestionController),
);

routes.get(
  "/api/question/:id",
  authMiddleware,
  QuestionController.getSingle.bind(QuestionController),
);

routes.post(
  "/api/question/:surveyId",
  authMiddleware,
  QuestionController.create.bind(QuestionController),
);

routes.put(
  "/api/question/:id",
  authMiddleware,
  QuestionController.update.bind(QuestionController),
);

routes.delete(
  "/api/question/:id",
  authMiddleware,
  QuestionController.delete.bind(QuestionController),
);

export default routes;
