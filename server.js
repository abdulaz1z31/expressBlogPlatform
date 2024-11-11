import express from "express";
import { port } from "./src/config/index.config.js";
import { connectMongodb } from "./src/database/index.database.js";
import {
  articleRouter,
  cartegoryRouter,
  commentRouter,
  courseRouter,
  userRouter,
} from "./src/routes/index.routes.js";
import { rateLimit } from "express-rate-limit";
import { errorMessages, statusCodes } from "./src/utils/index.js";

const app = express();

const limiter = rateLimit({
  windowMs: 1000 * 60,
  limit: 200,
});
app.use(express.json());
app.use(limiter);

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/cartegory", cartegoryRouter);
app.use("/aritcle", articleRouter);
app.use("/comment", commentRouter);

app.use((req, res) => {
  res.status(statusCodes.NOT_FOUND).send(errorMessages.NOT_FOUND);
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
  }
});
app.listen(port, async () => {
  await connectMongodb();
  console.log(`server is running on ${port} port`);
});
