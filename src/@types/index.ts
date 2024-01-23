import { Request, Response } from 'express';
import { Optional } from 'sequelize';
import DataClass from './DataClass';

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

export type UserModelBody = UserBody & Optional<any, string>;

interface CepObjectInvalid {
  name: string;
  message: string;
  type: string;
  errors: CepObjectError | CepObjectError[];
}

export interface ErrorList {
  unknown: string;
  empty: string;
  type: string;
  length: string;
  validation: string;
}

export type CepObject = CepObjectValid | CepObjectInvalid;
export type PromiseRes = Promise<Response<any, Record<string, any>>>;
export type CustomReq = Request & UserRequest;

export class UserClass extends DataClass {
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
}
