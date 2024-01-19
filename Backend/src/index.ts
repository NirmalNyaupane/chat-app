import express from "express";
import { AppDataSource } from "./config/database.config";
import mediaRouter from './routes/media.routes';

const app = express();

/*************** globals middlewares *****************************/
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import EnvConfiguration from "./config/env.config";
import errorHandler from "./middlewares/error.middleware";
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import chatRouter from './routes/chat.routes';
import messageRoute from './routes/message.routes';
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(cookieParser());
// app.use(limiter);


//app router 
app.use("/media", mediaRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRoute);

//global error handler
app.use(errorHandler);

AppDataSource.initialize().then(() => {
  console.log("Datasource initialized");
  app.listen(EnvConfiguration.PORT, () => {
    console.log(`Server started at port ${EnvConfiguration.PORT}`);
  });
}).catch((e) => {
  console.log("error occurs", e)
});
