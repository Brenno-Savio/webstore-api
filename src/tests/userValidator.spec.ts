import { UserClass, UserModelBody } from '../@types';
import getErrorMessage from '../lib/utils/getErrorMessage';
import userValidator from '../validators/user';

const user = {
  name: 'Brenno',
  lastname: 'Savio',
  cpf: '06342432171',
  cep: '79097382',
  email: 'brenno@email.com',
  password: 'Test1998#',
  admin: true,
};

describe('User names test', () => {
  it('shoud return empty message', async () => {
    user.name = '';
    const userInValidation = new UserClass(user as unknown as UserModelBody);
    const { body, errors } = await userValidator(userInValidation);
    expect(errors[0]).toBe(getErrorMessage('empty', 'name'));
  });
  it('shoud return length message', async () => {
    user.name = 'a';
    const userInValidation = new UserClass(user as unknown as UserModelBody);
    const { body, errors } = await userValidator(userInValidation);
    expect(errors[0]).toBe(getErrorMessage('length', 'name', '3', '20'));
  });
  it('shoud return length message', async () => {
    user.name = 'aBCDEAKFCJKP,SAOVOPANCTUOLAJ';
    const userInValidation = new UserClass(user as unknown as UserModelBody);
    const { body, errors } = await userValidator(userInValidation);
    expect(errors[0]).toBe(getErrorMessage('length', 'name', '3', '20'));
  });
});
