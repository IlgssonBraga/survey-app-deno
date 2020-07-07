import { surveysCollection } from "../../config/mongo.ts";

export default class Survey {
  public id: string = "";

  constructor(
    public userId: string,
    public name: string,
    public description: string,
  ) {
  }

  async create() {
    delete this.id;
    const { $oid } = await surveysCollection.insertOne(this);
    this.id = $oid;
    return this;
  }
}
