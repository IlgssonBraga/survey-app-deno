import { RouterContext } from "../../../deps.ts";
import User from "../models/User.ts";
import BaseSurveyController from "./BaseSurveyController.ts";
import Question from "../models/Question.ts";

class QuestionController extends BaseSurveyController {
  async getBySurvey(ctx: RouterContext) {
    const surveyId: string = ctx.params.surveyId!;
    const survey = await this.findSurveyOrFail(surveyId, ctx);
    if (survey) {
      const questions = await Question.findBySurvey(surveyId);
      ctx.response.body = questions;
    }
  }

  async getSingle(ctx: RouterContext) {
  }

  async create(ctx: RouterContext) {
    const surveyId: string = ctx.params.surveyId!;
    const {
      value: { text, type, required, data },
    } = await ctx.request.body();

    const survey = await this.findSurveyOrFail(surveyId, ctx);

    if (survey) {
      const question = new Question(surveyId, text, type, required, data);
      await question.create();
      ctx.response.body = question;
      ctx.response.status = 201;
    }
  }

  async update(ctx: RouterContext) {
    const id = ctx.params.id!;

    const question = await Question.findById(id);

    if (!question) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid question" };
      return;
    }

    const {
      value: { text, type, required, data },
    } = await ctx.request.body();

    await question.update(text, type, required, data);
    ctx.response.body = question;
  }

  async delete(ctx: RouterContext) {
  }
}

export default new QuestionController();
