import express from "express";
import { AppDataSource } from "./config/database.config";
import mediaRouter from './routes/media.routes';

const app = express();

/*************** globals middlewares *****************************/
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware";
import EnvConfiguration from "./config/env.config";
import authRouter from './routes/auth.routes';

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
app.use(limiter);


//app router 
app.use("/media",mediaRouter);
app.use("/auth", authRouter)
//global error handler
app.use(errorHandler);

AppDataSource.initialize().then(() => {
  console.log("Datasource initialized");
  app.listen(EnvConfiguration.PORT, () => {
    console.log(`Server started at port ${EnvConfiguration.PORT}`);
  });
});
app.listen(4000, () => {
  console.log("hello world");
});
