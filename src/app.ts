import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
const app = express();

import routes from "./app/routes";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api", routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: error.message, error: error });
});

export default app;
