import { ProductModel } from '../@types/Models';
import notNegative from '../lib/utils/notNegative';

export default async function productValidator(
  product: ProductModel,
): Promise<ProductModel> {
  const validations: any[][] = [
    ['null', product.body.name, 'name'],
    ['type', product.body.name, 'string', 'name'],
    ['length', product.body.name, 3, 20, 'name'],
    ['corrector', product.body.name, 'name'],
    ['null', product.body.price, 'price'],
    ['type', product.body.price, 'number', 'price'],
    ['validation', notNegative, product.body.price, 'price'],
    ['null', product.body.stock, 'stock'],
    ['type', product.body.stock, 'number', 'stock'],
    ['validation', notNegative, product.body.stock, 'stock'],
  ];

  for (let i = 0; i < validations.length; i++) {
    if (validations[i][0] === 'null') {
      product.isNull(validations[i][1], validations[i][2]);
    }
    if (validations[i][0] === 'type') {
      product.whatType(validations[i][1], validations[i][2], validations[i][3]);
    }
    if (validations[i][0] === 'length') {
      product.checkLength(
        validations[i][1],
        validations[i][2],
        validations[i][3],
        validations[i][4],
      );
    }
    if (validations[i][0] === 'validation') {
      product.validation(
        validations[i][1],
        validations[i][2],
        validations[i][3],
      );
    }

    if (product.errors.length > 0) return product;
  }

  product.nameCorrector(product.body.name);

  return product;
}
