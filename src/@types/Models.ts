import { CategoryModelBody, ProductModelBody, UserModelBody } from '.';

import cep from 'cep-promise';
import { isMasked, mask } from 'node-cpf';
import { CepObject } from '.';
import getErrorMessage from '../lib/utils/getErrorMessage';

export class DataModel {
  public errors: string[] = [];

  isNull(value: any, field: string): void {
    if (value === '' || typeof value === 'undefined') {
      this.errors.push(getErrorMessage('empty', field));
    }
  }
  whatType(value: any, type: string, field: string): void {
    if (typeof value !== type) {
      this.errors.push(getErrorMessage('type', field, type));
    }
  }
  checkLength(value: string, min: number, max: number, field: string): void {
    if (value.length > max || value.length < min) {
      this.errors.push(
        getErrorMessage('length', field, String(min), String(max)),
      );
    }
  }
  validation = async (
    validator: any,
    value: string | number,
    field: string,
  ): Promise<void> => {
    if (!validator(value)) {
      this.errors.push(getErrorMessage('validation', field));
    }
    if (validator === cep) {
      const cepObject: CepObject = await cep(value);
      if ('name' in cepObject && cepObject.name === 'CepPromiseError') {
        this.errors.push(getErrorMessage('validation', field));
      }
    }
  };
}

export class UserModel extends DataModel {
  body: UserModelBody;
  constructor(body: UserModelBody) {
    super();
    this.body = body;
  }

  nameCorrector(value: string, field: string): void {
    let newValue;

    if (/\s/.test(value)) {
      const compostName = value.toLowerCase().split(' ');
      let [firstName, secondName] = compostName;
      firstName = firstName.replace(firstName[0], firstName[0].toUpperCase());
      secondName = secondName.replace(
        secondName[0],
        secondName[0].toUpperCase(),
      );

      newValue = `${firstName} ${secondName}`;
    } else {
      let lowername = value.toLowerCase();
      newValue = lowername.replace(lowername[0], lowername[0].toUpperCase());
    }
    this.body[field] = newValue;
  }
  cpfCorrector(value: string): void {
    if (!isMasked(value)) {
      this.body.cpf = mask(value);
    }
  }
}

export class CategoryModel extends DataModel {
  body: CategoryModelBody;
  constructor(body: CategoryModelBody) {
    super();
    this.body = body;
  }

  nameCorrector(value: string): void {
    let newValue;

    if (/\s/.test(value)) {
      const compostName = value.toLowerCase().split(' ');
      let [firstName, secondName] = compostName;
      firstName = firstName.replace(firstName[0], firstName[0].toUpperCase());
      secondName = secondName.replace(
        secondName[0],
        secondName[0].toUpperCase(),
      );

      newValue = `${firstName} ${secondName}`;
    } else {
      let lowername = value.toLowerCase();
      newValue = lowername.replace(lowername[0], lowername[0].toUpperCase());
    }
    this.body.name = newValue;
  }
}

export class ProductModel extends DataModel {
  body: ProductModelBody;
  constructor(body: ProductModelBody) {
    super();
    this.body = body;
  }

  nameCorrector(value: string): void {
    let newValue;

    if (/\s/.test(value)) {
      const compostName = value.toLowerCase().split(' ');
      let [firstName, secondName] = compostName;
      firstName = firstName.replace(firstName[0], firstName[0].toUpperCase());
      secondName = secondName.replace(
        secondName[0],
        secondName[0].toUpperCase(),
      );

      newValue = `${firstName} ${secondName}`;
    } else {
      let lowername = value.toLowerCase();
      newValue = lowername.replace(lowername[0], lowername[0].toUpperCase());
    }
    this.body.name = newValue;
  }
}
