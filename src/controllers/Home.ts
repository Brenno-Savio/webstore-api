import { Request, Response } from 'express';

class Home {
  index(req: Request, res: Response): void {
    res.json({
      API_NAME: 'Webstore API',
    });
  }
}

export default new Home();
