import express from "express";
import { logger } from "./src/config/logger";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.route";
import { errorHandler } from "./src/middlewares/error.middleware";
import passport from "passport";
import { strategy } from "./src/config/passport";
import { authenticationMiddleware } from "./src/middlewares/auth.middleware";
import libraryRoutes from "./src/routes/library.route";
import bookRoutes from "./src/routes/book.route";
import uploadRoutes from "./src/routes/upload.route";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";
const DB_HOST = process.env.DATABASE_HOST || "";

app.use(cors());
app.use(express.json());

passport.use(strategy); // Define strategy

app.use(userRoutes);

app.use("/library", libraryRoutes);
app.use("/upload", authenticationMiddleware, uploadRoutes);
app.use("/book", authenticationMiddleware, bookRoutes);
app.use("/images", express.static("images"));
app.use("/templates", express.static("templates"));

app.use(errorHandler);

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// If database does not exist, mongoose will create new one
mongoose
  .connect(DB_HOST)
  .then(() => {
    logger.info(`Connected to Mongo with ${DB_HOST}`);
  })
  .catch((error) => {
    logger.error(error);
  });
app.listen(PORT, () => {
  console.log(
    `🙏[Home-library-BE]: Server is running at https://${HOST}:${PORT}`
  );
});
