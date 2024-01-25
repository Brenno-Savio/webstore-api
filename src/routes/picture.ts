import { Router } from 'express';

import picture from '../controllers/Picture';

const router: Router = Router();

router.post('/', picture.store);
router.delete('/:id', picture.delete);

export default router;
