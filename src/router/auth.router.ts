import express from 'express';
import {
  adminHandler,
  getAllUsersHandler,
  loginHandler,
  registerHandler,
  userHandler,
} from '../controller/auth.controller';
import { authorize, protect } from '../middelware/protect';
import validate from '../middelware/validate';
import { loginSchema, registerSchema } from '../zodSchema/auth.schema';

const router = express.Router();

router.post('/login', validate(loginSchema), loginHandler);
router.get('/users', protect, getAllUsersHandler);
router.post('/register', validate(registerSchema), registerHandler);
router.get('/admin', protect, authorize('ADMIN'), adminHandler);
router.get('/user', protect, authorize('USER', 'ADMIN'), userHandler);
router.get('/superuser', protect, authorize('ADMIN'), adminHandler);

export default router;