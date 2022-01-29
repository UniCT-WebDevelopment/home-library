import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const user_id = req.locals.user._id;
    const dir = `${process.env.IMAGES_PATH}${user_id}`;
    const exists = fs.existsSync(dir);
    if (!exists) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const multerUpload = multer({
  storage: storage,
});

export default multerUpload;
