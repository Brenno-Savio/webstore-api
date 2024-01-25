import { Router } from 'express';
import user from '../controllers/User';
import adminRequired from '../middlewares/adminRequired';
import loginRequired from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', user.store);
router.get('/', loginRequired, adminRequired, user.index);
router.get('/:id', loginRequired, adminRequired, user.show);
router.put('/:id', loginRequired, adminRequired, user.update);
router.delete('/:id', loginRequired, adminRequired, user.delete);

export default router;
