import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomReq } from '../@types';
import Users from '../models/Users';

export default async (
  req: CustomReq,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET as string);
    const { id, email, admin } = data as jwt.JwtPayload;
    const user = await Users.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        errors: ['Expired or invalid user'],
      });
    }
    req.userId = id;
    req.userEmail = email;
    req.userAdmin = admin;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Expired or invalid token'],
    });
  }
};
