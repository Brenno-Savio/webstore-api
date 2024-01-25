import { Router } from 'express';
import product from '../controllers/Product';
import adminRequired from '../middlewares/adminRequired';
import loginRequired from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', loginRequired, adminRequired, product.store);
router.get('/', product.index);
router.get('/:id', product.show);
router.put('/:id', loginRequired, adminRequired, product.update);
router.delete('/:id', loginRequired, adminRequired, product.delete);

export default router;
