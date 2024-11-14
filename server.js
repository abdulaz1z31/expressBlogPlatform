import express from "express";
import { port } from "./src/config/index.config.js";
import { connectMongodb } from "./src/database/database.js";
import {
  articleRouter,
  cartegoryRouter,
  commentRouter,
  courseRouter,
  userRouter,
} from "./src/routes/index.routes.js";
import { rateLimit } from "express-rate-limit";
import { errorMessages, logger, statusCodes } from "./src/utils/index.js";

const app = express();

const limiter = rateLimit({
  windowMs: 1000 * 60,
  limit: 200,
});
app.use(express.json());
app.use(limiter);


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/cartegory", cartegoryRouter);
app.use("/aritcle", articleRouter);
app.use("/comment", commentRouter);

app.use((req, res) => {
  res.status(statusCodes.NOT_FOUND).send(errorMessages.NOT_FOUND);
});


app.listen(port, async () => {
  await connectMongodb();
  logger.info(`server is running on ${port} port`);
});
