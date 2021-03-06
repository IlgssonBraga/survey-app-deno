import { MongoClient } from "../../deps.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");
const db = client.database("deno-survey");

export const usersCollection = db.collection("users");
export const surveysCollection = db.collection("surveys");
export const questionsCollection = db.collection("questions");
