import { usersCollection } from "../../config/mongo.ts";

export default class User {
  static findOne(params: Object) {
    return usersCollection.findOne(params);
  }
}
