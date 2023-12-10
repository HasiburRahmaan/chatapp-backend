import { port } from "./config";
import app from "./app";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/chat-app");
    console.log("Connected to MongoDB");
    let server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log("============>", error);
  }
}

main();
