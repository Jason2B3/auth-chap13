//# HELPER function file
import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const cluster = {
    username: "JasonAdmin",
    password: "2BReborn",
    db: "auth-chap13",
  };
  const mongoURI = `mongodb+srv://${cluster.username}:${cluster.password}@cluster0.ufiop.mongodb.net/${cluster.db}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(mongoURI);
  return client;
} // no error handling used (warning)
