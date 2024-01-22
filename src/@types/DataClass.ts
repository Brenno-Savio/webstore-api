import cep from 'cep-promise';
import { CepObject } from '.';
import getErrorMessage from '../lib/utils/getErrorMessage';

export default class DataClass {
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
