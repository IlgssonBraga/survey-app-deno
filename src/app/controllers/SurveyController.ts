import { RouterContext } from "../../../deps.ts";
import Survey from "../models/Servey.ts";

class SurveyController {
  async getAllForUser(ctx: RouterContext) {
    ctx.response.body = [];
  }

  async getSingle(ctx: RouterContext) {}

  async create(ctx: RouterContext) {
    const { value: { name, description } } = await ctx.request.body();

    const survey = new Survey("1", name, description);

    await survey.create();

    ctx.response.status = 201;
    ctx.response.body = survey;
  }

  async update(ctx: RouterContext) {}

  async delete(ctx: RouterContext) {}
}

export default new SurveyController();
