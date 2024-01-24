import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomReq, PromiseRes } from '../@types';
import { env } from '../lib/env';
import getErrorMessage from '../lib/utils/getErrorMessage';
import Users from '../models/Users';

class TokenController {
  async store(req: CustomReq, res: Response): PromiseRes {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({ errors: ['Invalid email or password'] });
      }

      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ errors: ['This user not exist'] });
      }

      if (!(await user.passwordValidator(password))) {
        return res.status(400).json({ errors: ['Invalid password'] });
      }

      if (!env.TOKEN_SECRET) {
        return res.status(500).json({
          errors: ['An unexpected error has occurred, please contact support'],
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, env.TOKEN_SECRET, {
        expiresIn: env.TOKEN_EXPIRATION,
      });

      return res.json({ token });
    } catch (e: any) {
      return res.status(500).json({ errors: getErrorMessage('unknown') });
    }
  }
}

export default new TokenController();
