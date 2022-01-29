import express from "express";
import { uploadFile } from "../middlewares/multer.middleware";
import multerUpload from "../config/multer";

const uploadRoutes = express.Router();

uploadRoutes.post("/", multerUpload.single("myImage"), uploadFile);

export default uploadRoutes;
