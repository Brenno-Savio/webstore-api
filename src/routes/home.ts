import { Router } from 'express';
import Home from '../controllers/Home';

const router: Router = Router();

router.get('/', Home.index);

export default router;
