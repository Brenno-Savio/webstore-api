import { Request, Response } from 'express';

class Home {
  index(req: Request, res: Response): void {
    res.json({
      API_NAME: 'Webstore API',
      USER_CONDITIONS: {
        name: {
          1: 'Required',
          2: 'String',
          3: 'Letters between 3 and 20',
          4: 'Not allowed numbers or symbols that are not a letter',
        },
        lastname: {
          1: 'Required',
          2: 'String',
          3: 'Letters between 3 and 20',
          4: 'Not allowed numbers or symbols that are not a letter',
        },
        cpf: {
          1: 'Required',
          2: 'String',
          3: 'API will automatically validate',
          4: 'Any form of writing',
        },
        cep: {
          1: 'Required',
          2: 'Number',
          3: 'API will automatically validate',
          4: 'Only numbers',
        },
        email: {
          1: 'Required',
          2: 'String',
          3: 'API will automatically validate',
        },
        password: {
          1: 'Required',
          2: 'String',
          3: 'At last one uppercase letter',
          4: 'At last one lowercase letter',
          5: 'At last one symbol',
          6: 'At last one number',
          7: 'No space',
          8: 'Between 8 and 32 characters',
        },
        admin: {
          1: 'Required',
          2: 'Boolean',
        },
      },
    });
  }
}

export default new Home();
