import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/AuthMiddleware';
import { getAllUsers } from '../controllers/UserController';

const router = Router();

router.get('/allUsers', authenticate, authorize('admins'), getAllUsers)


export default router;