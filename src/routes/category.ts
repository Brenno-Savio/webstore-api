import { Router } from 'express';
import category from '../controllers/Category';
import adminRequired from '../middlewares/adminRequired';
import loginRequired from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', loginRequired, adminRequired, category.store);
router.get('/', category.index);
router.get('/:id', category.show);
router.put('/:id', loginRequired, adminRequired, category.update);
router.delete('/:id', loginRequired, adminRequired, category.delete);

export default router;
