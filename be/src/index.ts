import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
import { env } from "./config/index";
import cookieParser from "cookie-parser";
import connectDb from "./config/database";
import userRoutes from "./User";
import postRoutes from "./Post";
import errorHandler from "./middleware/errorMiddleware";
import path from "path";

const app: Express = express();
const port = env.PORT;
connectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    // credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/images", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRoutes());
app.use("/api/posts", postRoutes());

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
