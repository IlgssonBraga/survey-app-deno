import { RouterContext } from "../../../deps.ts";

class SurveyController {
  async getAllForUser(ctx: RouterContext) {
    ctx.response.body = [];
  }

  async getSingle(ctx: RouterContext) {}

  async create(ctx: RouterContext) {}

  async update(ctx: RouterContext) {}

  async delete(ctx: RouterContext) {}
}

export default new SurveyController();
