import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/AuthMiddleware';
import { deleteUser, editUser, forgotPassword, getAllAdmins, getAllUsers, getUserById, resetPassword } from '../controllers/UserController';

const router = Router();

router.get('/allUsers', authenticate, authorize('admins', 'teachers'), getAllUsers);
router.put('/:id', authenticate, editUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password',  resetPassword);
router.get('/:id', authenticate,  getUserById);
router.delete('/:id', authenticate, authorize('admins'),  deleteUser);
router.get('/admins', authenticate, authorize('admins'),  getAllAdmins);



export default router;