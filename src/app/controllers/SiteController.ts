import Survey from "../models/Servey.ts";

class SiteController {
  async surveys() {
    const surveys = await Survey.findAll();
  }

  viewSurvey() {
  }
}

export default new SiteController();
