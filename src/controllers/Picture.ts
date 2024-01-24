import { Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import { resolve } from 'path';
import { CustomFile, CustomReq, PromiseRes } from '../@types';
import multerConfig from '../config/multerConfig';
import getErrorMessage from '../lib/utils/getErrorMessage';
import Pictures from '../models/Pictures';

const upload = multer(multerConfig).single('picture');

class Picture {
  store(req: CustomReq, res: Response): void {
    return upload(req, res, async (err): PromiseRes => {
      if (err) {
        return res.status(400).json({
          errors: [err],
        });
      }

      try {
        const { originalname, filename } = req.file as CustomFile;
        const { product_id } = req.body;
        const picture = await Pictures.create({
          originalname,
          filename,
          product_id,
        });

        return res.json(picture);
      } catch (e) {
        return res.status(404).json({
          errors: ['Product not found'],
        });
      }
    });
  }

  async delete(req: CustomReq, res: Response): PromiseRes {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID not sent'],
        });
      }
      const picture = await Pictures.findByPk(req.params.id);
      if (!picture) {
        return res.status(400).json({
          errors: ['picture not found'],
        });
      }
      const filePath = resolve(
        __dirname,
        '..',
        '..',
        'uploads',
        'images',
        `${picture.filename}`,
      );
      fs.unlinkSync(filePath);
      await picture.destroy();
      return res.json(`this picture was deleted successfully`);
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknown'),
      });
    }
  }
}

export default new Picture();
