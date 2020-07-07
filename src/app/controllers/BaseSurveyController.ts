import { RouterContext } from "../../../deps.ts";
import Survey from "../models/Servey.ts";

export default class BaseSurveyController {
  async findSurveyOrFail(
    id: string,
    ctx: RouterContext,
  ): Promise<Survey | null> {
    const survey = await Survey.findById(id);

    if (!survey) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Survey not found" };
      return null;
    }

    return survey;
  }
}
