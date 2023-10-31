import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
dotenv.config();
import { env } from "./config/index";
import cookieParser from "cookie-parser";
import connectDb from "./config/database";
import userRoutes from "./User";
import postRoutes from "./Post";
import commentRoutes from "./Comment";
import reactionRoutes from "./Reaction";
import errorHandler from "./middleware/errorMiddleware";
import path from "path";

connectDb();
const app: Express = express();
const port = env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log(socket);
  socket.on("user", (user) => {
    console.log(user);
    socket.join(user);
  });
  socket.on("new-like", (sender, receiver) => {
    console.log(sender + " liked your post");
    console.log(receiver + " received a notification");
    io.to(receiver).emit("new-like", sender + " liked your blog");
    // console.log(receiver + "Received a notification");
  });
});

app.use("/api/images", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRoutes());
app.use("/api/posts", postRoutes());
app.use("/api/comments", commentRoutes());
app.use("/api/reactions", reactionRoutes());

app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
