import cep from 'cep-promise';
import { validate } from 'node-cpf';
import isEmail from 'validator/lib/isEmail';
import { UserClass } from '../@types';
import { notNumOrSym } from '../lib/utils/notNumOrSym';
import passwordRegex from '../lib/utils/passwordRegex';

export default async function userValidator(
  user: UserClass,
): Promise<UserClass> {
  const validations: any[][] = [
    ['null', user.body.name, 'name'],
    ['type', user.body.name, 'string', 'name'],
    ['length', user.body.name, 3, 20, 'name'],
    ['validation', notNumOrSym, user.body.name, 'name'],
    ['null', user.body.lastname, 'lastname'],
    ['type', user.body.lastname, 'string', 'lastname'],
    ['length', user.body.lastname, 3, 20, 'lastname'],
    ['validation', notNumOrSym, user.body.lastname, 'lastname'],
    ['null', user.body.cpf, 'CPF'],
    ['type', user.body.cpf, 'string', 'CPF'],
    ['validation', validate, user.body.cpf, 'CPF'],
    ['null', user.body.cep, 'CEP'],
    ['type', user.body.cep, 'string', 'CEP'],
    ['validation', cep, user.body.cep, 'CEP'],
    ['null', user.body.email, 'email'],
    ['type', user.body.email, 'string', 'email'],
    ['validation', isEmail, user.body.email, 'email'],
    ['null', user.body.password, 'password'],
    ['type', user.body.password, 'string', 'password'],
    ['validation', passwordRegex, user.body.password, 'password'],
    ['null', user.body.admin, 'admin'],
    ['type', user.body.admin, 'boolean', 'admin'],
  ];

  for (let i = 0; i < validations.length; i++) {
    if (validations[i][0] === 'null') {
      user.isNull(validations[i][1], validations[i][2] as string);
    }
    if (validations[i][0] === 'type') {
      user.whatType(
        validations[i][1],
        String(validations[i][2]),
        String(validations[i][3]),
      );
    }
    if (validations[i][0] === 'length') {
      user.checkLength(
        String(validations[i][1]),
        Number(validations[i][2]),
        Number(validations[i][3]),
        String(validations[i][4]),
      );
    }
    if (validations[i][0] === 'validation') {
      user.validation(validations[i][1], validations[i][2], validations[i][3]);
    }

    if (user.errors.length > 0) return user;
  }

  return user;
}
