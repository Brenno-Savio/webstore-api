import cep from 'cep-promise';
import { validate } from 'node-cpf';
import isEmail from 'validator/lib/isEmail';
import { CepObject, UserClass } from '../@types';
import getErrorMessage from '../lib/utils/getErrorMessage';
import { notNumOrSym } from '../lib/utils/notNumOrSym';
import passwordRegex from '../lib/utils/passwordRegex';

export default async function userValidator(
  user: UserClass,
): Promise<UserClass> {
  //name
  user.isNull(user.body.name, 'name');
  user.whatType(user.body.name, 'string', 'name');
  user.checkLength(user.body.name, 3, 20, 'name');
  user.validation(notNumOrSym, user.body.name, 'name');

  //lastname
  user.isNull(user.body.lastname, 'lastname');
  user.whatType(user.body.lastname, 'string', 'lastname');
  user.checkLength(user.body.lastname, 3, 20, 'lastname');
  user.validation(notNumOrSym, user.body.lastname, 'lastname');

  //cpf
  user.isNull(user.body.cpf, 'CPF');
  user.whatType(user.body.cpf, 'string', 'CPF');
  user.validation(validate, user.body.cpf, 'CPF');

  //cep
  user.isNull(user.body.cep, 'CEP');
  user.whatType(user.body.cep, 'number', 'CEP');
  const cepObject: CepObject = await cep(user.body.cep);
  if ('name' in cepObject && cepObject.name === 'CepPromiseError') {
    user.errors.push(getErrorMessage('valiadation', 'CEP'));
  }

  //email
  user.isNull(user.body.email, 'email');
  user.whatType(user.body.email, 'string', 'email');
  user.validation(isEmail, user.body.email, 'email');

  //password
  user.isNull(user.body.password, 'password');
  user.whatType(user.body.password, 'string', 'password');
  user.validation(passwordRegex, user.body.password, 'password');

  //admin
  user.isNull(user.body.admin, 'admin');
  user.whatType(user.body.admin, 'boolean', 'admin');

  return user;
}
