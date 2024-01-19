import { Request, Response } from 'express';
import { Optional } from 'sequelize';
import getErrorMessage from '../lib/utils/getErrorMessage';

interface CepObjectError {
  message: string;
  service: string;
}

export interface CustomFile extends Express.Multer.File {
  originalname: string;
  filename: string;
}

interface UserRequest extends Request {
  userId?: number;
  userEmail?: string;
  userAdmin?: boolean;
  file?: CustomFile;
}

interface CepObjectValid {
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
}

interface UserBody {
  name: string;
  lastname: string;
  cpf: string;
  cep: number;
  email: string;
  password: string;
  admin: boolean;
}

type UserModelBody = UserBody & Optional<any, string>;

interface CepObjectInvalid {
  name: string;
  message: string;
  type: string;
  errors: CepObjectError | CepObjectError[];
}

class DataClass {
  public errors: string[] = [];

  isNull(value: any, field: string): void {
    if(typeof value === null) {
      this.errors.push(getErrorMessage('empty', field));
    }
  }
  whatType(value: any, type: string, field: string): void {
    if(typeof value !== type) {
      this.errors.push(getErrorMessage('type', field, type))
    }
  }
  checkLength(value: string, min: number, max: number, field: string): void {
    if(value.length > max || value.length < min) {
      this.errors.push(getErrorMessage('length', field, String(min), String(max)))
    }
  }
  validation(validator: any, value: string | number, field: string): void {
    if(!validator(value)) {
      this.errors.push(getErrorMessage('validation', field));
    }
  }
}

export interface ErrorList {
  unknown: string;
  empty: string;
  type: string;
  lenght: string;
  validation: string;
}

export type CepObject = CepObjectValid | CepObjectInvalid;
export type PromiseRes = Promise<Response<any, Record<string, any>>>;
export type CustomReq = Request & UserRequest;


export class UserClass extends DataClass{
  body: UserModelBody;
  constructor(body: UserModelBody, public errors: string[] = []) {
    super();
    this.body = body;
  }
}
