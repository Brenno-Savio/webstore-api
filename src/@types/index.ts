import { Request, Response } from 'express';
import { Optional } from 'sequelize';

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

interface CategoryBody {
  name: string;
}

interface ProductBody {
  name: string;
  price: number;
  stock: number;
  user_id: string;
  category_id: string;
}

export type UserModelBody = UserBody & Optional<any, string>;
export type CategoryModelBody = CategoryBody & Optional<any, string>;
export type ProductModelBody = ProductBody & Optional<any, string>;

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
  insufficient: string;
}

export type CepObject = CepObjectValid | CepObjectInvalid;
export type PromiseRes = Promise<Response<any, Record<string, any>>>;
export type CustomReq = Request & UserRequest;
