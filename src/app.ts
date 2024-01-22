import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';

dotenv.config();

import home from './routes/home';
import user from './routes/user';

class App {
  app: express.Application;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/user/', user);
  }
}

export default new App().app;
