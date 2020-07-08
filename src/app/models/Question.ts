import { questionsCollection } from "../../config/mongo.ts";

export default class Question {
  public id: string = "";
  constructor(
    public surveyId: string,
    public text: string,
    public type: QuestionType,
    public required: boolean,
    public data: any,
  ) {}

  static async findBySurvey(surveyId: string): Promise<Question[]> {
    const questions = await questionsCollection.find({ surveyId });
    return questions.map((question: any) => Question.prepare(question));
  }

  static async findById(id: string): Promise<Question | null> {
    const question = await questionsCollection.findOne({ _id: { $oid: id } });
    if (!question) {
      return null;
    }
    return Question.prepare(question);
  }

  async create() {
    delete this.id;
    const { $oid } = await questionsCollection.insertOne(this);
    this.id = $oid;
    return this;
  }

  async update(text: string, type: QuestionType, required: boolean, data: any) {
    await questionsCollection.updateOne(
      { _id: { $oid: this.id } },
      { text, type, required, data },
    );

    this.text = text;
    this.type = type;
    this.required = required;
    this.data = data;
    return this;
  }

  delete() {
    return questionsCollection.deleteOne({ _id: { $oid: this.id } });
  }
}

export enum QuestionType {
  CHOICE = "choice",
  TEXT = "text",
}
