import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./app/routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api", routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("=========>", error);
  res.status(500).json({ message: error.message, error: error });
});

export default app;
