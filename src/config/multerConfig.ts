import { Request } from 'express';
import multer from 'multer';
import { extname, resolve } from 'path';

const random = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    if (
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg'
    ) {
      return cb(new multer.MulterError(`LIMIT_UNEXPECTED_FILE`));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file: Express.Multer.File, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    },
  }),
};
