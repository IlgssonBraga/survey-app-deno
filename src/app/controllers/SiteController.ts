import Survey from "../models/Servey.ts";
import { renderFileToString, RouterContext } from "../../../deps.ts";

class SiteController {
  async surveys(ctx: RouterContext) {
    // const surveys = await Survey.findAll();
    ctx.response.body = await renderFileToString(
      `${Deno.realPathSync(Deno.cwd())}/src/app/views/surveys.ejs`,
      {},
    );
  }

  viewSurvey() {
  }
}

export default new SiteController();
