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

  try {
    if (!token) return;
    const data = jwt.verify(token, process.env.TOKEN_SECRET as string);
    const { id } = data as jwt.JwtPayload;
    const user = await Users.findByPk(id, { attributes: ['admin'] });

    if (!user?.dataValues.admin)
      return res.status(400).json({
        erros: ['This option is only available for admins'],
      });

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Invalid user'],
    });
  }
};
