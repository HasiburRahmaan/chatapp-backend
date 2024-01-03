import { port } from "./config";
import app from "./app";
import mongoose from "mongoose";
import { expressServer } from "./socket-io";

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/chat-app");
    console.log("Connected to MongoDB");
    expressServer.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log("============>", error);
  }
}

main();
