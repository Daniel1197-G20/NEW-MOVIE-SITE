import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // ✅ Correct
  .setProject("690b505b000a804fae9a");

export const account = new Account(client);
export const databases = new Databases(client);
export default client;
