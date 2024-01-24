import cep from 'cep-promise';
import { validate } from 'node-cpf';
import isEmail from 'validator/lib/isEmail';
import { UserModel } from '../@types/Models';
import { notNumOrSym } from '../lib/utils/notNumOrSym';
import passwordRegex from '../lib/utils/passwordRegex';

export default async function userValidator(
  user: UserModel,
): Promise<UserModel> {
  const validations: any[][] = [
    ['null', user.body.name, 'name'],
    ['type', user.body.name, 'string', 'name'],
    ['length', user.body.name, 3, 20, 'name'],
    ['validation', notNumOrSym, user.body.name, 'name'],
    ['corrector', user.body.name, 'name'],
    ['null', user.body.lastname, 'lastname'],
    ['type', user.body.lastname, 'string', 'lastname'],
    ['length', user.body.lastname, 3, 20, 'lastname'],
    ['validation', notNumOrSym, user.body.lastname, 'lastname'],
    ['corrector', user.body.lastname, 'lastname'],
    ['null', user.body.cpf, 'CPF'],
    ['type', user.body.cpf, 'string', 'CPF'],
    ['validation', validate, user.body.cpf, 'CPF'],
    ['mask', user.body.cpf],
    ['null', user.body.cep, 'CEP'],
    ['length', user.body.cep, 8, 8, 'CEP'],
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
      user.isNull(validations[i][1], validations[i][2]);
    }
    if (validations[i][0] === 'type') {
      user.whatType(validations[i][1], validations[i][2], validations[i][3]);
    }
    if (validations[i][0] === 'length') {
      user.checkLength(
        validations[i][1],
        validations[i][2],
        validations[i][3],
        validations[i][4],
      );
    }
    if (validations[i][0] === 'validation') {
      user.validation(validations[i][1], validations[i][2], validations[i][3]);
    }

    if (validations[i][0] === 'corrector') {
      user.nameCorrector(validations[i][1], validations[i][2]);
    }

    if (validations[i][0] === 'mask') {
      user.cpfCorrector(validations[i][1]);
    }

    if (user.errors.length > 0) return user;
  }

  return user;
}
