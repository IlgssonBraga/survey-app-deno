import { surveysCollection } from "../../config/mongo.ts";

export default class Survey {
  public id: string = "";

  constructor(
    public userId: string,
    public name: string,
    public description: string,
  ) {}

  static async findByUser(userId: string): Promise<Survey[]> {
    const surveys = await surveysCollection.find({ userId });
    return surveys.map((survey: any) => Survey.prepare(survey));
  }

  async create() {
    delete this.id;
    const { $oid } = await surveysCollection.insertOne(this);
    this.id = $oid;
    return this;
  }

  private static prepare(data: any): Survey {
    data.id = data._id.$oid;
    delete data._id;

    const survey = new Survey(data.userId, data.name, data.description);
    survey.id = data.id;
    return survey;
  }
}
