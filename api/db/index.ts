import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");
export const db = client.database("src-app");
export const _electDB = client.database("src-election");
export const _commDB = client.database("src-community");

