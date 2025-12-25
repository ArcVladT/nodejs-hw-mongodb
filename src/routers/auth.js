import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserValidationSchema,
  userValidationSchema,
} from '../../validation/auth.js';
import {
  loginUserController,
  logoutSessionController,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(userValidationSchema),
  registerUserController,
);

router.post(
  '/login',
  validateBody(loginUserValidationSchema),
  loginUserController,
);

router.post('/refresh', refreshSessionController);

router.post('/logout', logoutSessionController);

export default router;
