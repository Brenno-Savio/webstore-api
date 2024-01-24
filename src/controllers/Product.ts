import { Response } from 'express';
import { Attributes, FindOptions, OrderItem, WhereOptions } from 'sequelize';
import { CustomReq, PromiseRes } from '../@types';
import { ProductModel } from '../@types/Models';
import filterSystem from '../lib/utils/filterSystem';
import getErrorMessage from '../lib/utils/getErrorMessage';
import Products from '../models/Products';
import productValidator from '../validators/product';

class Product {
  async store(req: CustomReq, res: Response): PromiseRes {
    try {
      const productInValidation = new ProductModel(req.body);
      const { errors, body } = await productValidator(productInValidation);

      if (typeof body === 'undefined') {
        return res.status(500).json({
          errors: getErrorMessage('unknown'),
        });
      }

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const newProduct = await Products.create(body);

      return res.status(200).json({ newProduct });
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknown'),
      });
    }
  }

  async index(req: CustomReq, res: Response): PromiseRes {
    const { filter, sort, limit, offset, attributes } = req.query;

    const paramQuery: FindOptions = {};

    if (typeof attributes !== 'undefined' && attributes !== '') {
      paramQuery.attributes = attributes as Attributes<any>;
    }

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
      const product = await Products.findAll(paramQuery);
      return res.json(product);
    } catch (e) {
      return res.status(500).json({
        errors: getErrorMessage('unknown'),
      });
    }
  }

  async show(req: CustomReq, res: Response): PromiseRes {
    try {
      const { attributes } = req.query;

      const paramQuery: FindOptions = {};

      if (typeof attributes !== 'undefined' && attributes !== '') {
        paramQuery.attributes = attributes as Attributes<any>;
      }

      const product = await Products.findByPk(req.params.id, paramQuery);
      return res.json(product);
    } catch (e) {
      return res.status(404).json({ errors: ['Product not found'] });
    }
  }

  async update(req: CustomReq, res: Response): PromiseRes {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID not sent'],
        });
      }
      const product = await Products.findByPk(req.params.id);

      if (!product) {
        return res.status(404).json({
          errors: ['Product not found'],
        });
      }

      const productInValidation = new ProductModel(req.body);
      const { errors, body } = await productValidator(productInValidation);

      if (typeof body === 'undefined') {
        return res.status(500).json({
          errors: getErrorMessage('unknown'),
        });
      }

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const updatedProduct = await product.update(body);

      return res.status(200).json({ updatedProduct });
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
      const product = await Products.findByPk(req.params.id);
      if (!product) {
        return res.status(400).json({
          errors: ['Product not found'],
        });
      }
      if (product.stock > 0) {
        return res.status(400).json({
          errros: ['This product cannot be exclud while stock is more than 0'],
        });
      }
      await product.destroy();
      return res.json('This product was deleted successfully');
    } catch (e: any) {
      return res.status(500).json({
        errors: getErrorMessage('unknown'),
      });
    }
  }
}

export default new Product();
