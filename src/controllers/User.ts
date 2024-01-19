import { Response } from 'express';
import { FindOptions, OrderItem, WhereOptions } from 'sequelize';
import { CustomReq, PromiseRes, UserClass } from '../@types';
import filterSystem from '../lib/utils/filterSystem';
import getErrorMessage from '../lib/utils/getErrorMessage';
import Users from '../models/Users';
import userValidator from '../validators/user';

class UsersController {
  async store(req: CustomReq, res: Response): PromiseRes {
    try {
      const userInValidation = new UserClass(req.body);

      const { errors, body } = await userValidator(userInValidation);

      if (typeof body === 'undefined') {
        return res.status(500).json({
          errors: getErrorMessage('unknown'),
        });
      }

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const { id, name, lastname, email, cpf, cep } = await Users.create(body);

      return res.status(200).json({ id, name, lastname, email, cpf, cep });
    } catch (e: any) {
      const err = e.errors.map((err: any) => err.message);

      if (
        err[0] === 'cpf must be unique' ||
        err[0] === 'email must be unique'
      ) {
        return res.status(400).json({
          errors: err,
        });
      }

      return res.status(500).json({
        errors: getErrorMessage('unknownError'),
      });
    }
  }

  async index(req: CustomReq, res: Response): PromiseRes {
    const { filter, sort, limit, offset } = req.query;

    const paramQuery: FindOptions = {
      attributes: ['id', 'name', 'lastname', 'email', 'cpf', 'cep', 'admin'],
    };

    if (typeof filter !== 'undefined' && filter !== '') {
      paramQuery.where = filterSystem(filter as string[]) as WhereOptions<any>;
    }

    if (typeof sort !== 'undefined' && sort !== '') {
      let queryArray = [];
      for (const i of sort as string[]) {
        let query = i.split(':');
        queryArray.push(query);
        paramQuery.order = [...queryArray] as OrderItem[];
      }
    }

    if (typeof limit !== 'undefined' && limit !== '') {
      paramQuery.limit = Number(limit);
    }

    if (typeof offset !== 'undefined' && offset !== '') {
      paramQuery.offset = Number(offset);
    }

    try {
      const users = await Users.findAll(paramQuery);
      return res.json(users);
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknownError'),
      });
    }
  }

  async show(req: CustomReq, res: Response): PromiseRes {
    try {
      const User = await Users.findByPk(req.params.id, {
        attributes: ['id', 'name', 'lastname', 'email', 'cpf', 'cep', 'admin'],
      });
      return res.json(User);
    } catch (e) {
      return res.status(404).json({ errors: ['User not found'] });
    }
  }

  async update(req: CustomReq, res: Response): PromiseRes {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID not sent'],
        });
      }

      const userInValidation = new UserClass(req.body);
      const { errors, body } = await userValidator(userInValidation);

      const user = await Users.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          errors: ['user not found'],
        });
      }

      if ((!user.admin && req.body.admin) || (user.admin && !req.body.admin)) {
        return res.status(400).json({
          errors: ['You cannot change your admin status'],
        });
      }

      if (typeof body === 'undefined') {
        return res.status(500).json({
          errors: getErrorMessage('unknown'),
        });
      }

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const { id, email, name, lastname, cep, cpf, admin } =
        await user.update(body);
      return res.json({ id, email, name, lastname, cep, cpf, admin });
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknown'),
      });
    }
  }

  async delete(req: CustomReq, res: Response): PromiseRes {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID not sent'],
        });
      }
      const user = await Users.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          errors: ['User not found'],
        });
      }
      await user.destroy();
      return res.json(`This user was deleted successfully`);
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknown'),
      });
    }
  }
}

export default new UsersController();
