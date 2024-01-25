import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';

dotenv.config();

import category from './routes/category';
import home from './routes/home';
import picture from './routes/picture';
import product from './routes/product';
import token from './routes/token';
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
    this.app.use('/token/', token);
    this.app.use('/category/', category);
    this.app.use('/product/', product);
    this.app.use('/picture/', picture);
  }
}

export default new App().app;
