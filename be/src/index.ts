import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
import { env } from "./config/index";
import connectDb from "./config/database";

connectDb();

const app: Express = express();
const port = env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());

app.use("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// app.use("/user", userRoutes());

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
