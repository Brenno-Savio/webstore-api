import { Response } from 'express';
import { FindOptions, OrderItem, WhereOptions } from 'sequelize';
import { CustomReq, PromiseRes } from '../@types';
import { CategoryModel } from '../@types/Models';
import filterSystem from '../lib/utils/filterSystem';
import getErrorMessage from '../lib/utils/getErrorMessage';
import Categories from '../models/Categories';
import categoryValidator from '../validators/category';

class Category {
  async store(req: CustomReq, res: Response): PromiseRes {
    try {
      const categoryInValidation = new CategoryModel(req.body);
      const { errors, body } = await categoryValidator(categoryInValidation);

      if (typeof body === 'undefined') {
        return res.status(500).json({
          errors: getErrorMessage('unknown'),
        });
      }

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const newCategory = await Categories.create(body);

      return res.status(200).json({ newCategory });
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknown'),
      });
    }
  }

  async index(req: CustomReq, res: Response): PromiseRes {
    const { filter, sort, limit, offset } = req.query;

    const paramQuery: FindOptions = {
      attributes: ['id', 'name', 'created_at', 'updated_at'],
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
      const categories = await Categories.findAll(paramQuery);
      return res.json(categories);
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknown'),
      });
    }
  }

  async show(req: CustomReq, res: Response): PromiseRes {
    try {
      const category = await Categories.findByPk(req.params.id);
      return res.json(category);
    } catch (e) {
      return res.status(404).json({ errors: ['Category not found'] });
    }
  }

  async update(req: CustomReq, res: Response): PromiseRes {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID not sent'],
        });
      }
      const category = await Categories.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({
          errors: ['category not found'],
        });
      }
      const newData = await category.update(req.body);
      return res.json({ newData });
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
      const category = await Categories.findByPk(req.params.id);
      if (!category) {
        return res.status(400).json({
          errors: ['category not found'],
        });
      }
      await category.destroy();
      return res.json(`this category was deleted successfully`);
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknown'),
      });
    }
  }
}

export default new Category();
