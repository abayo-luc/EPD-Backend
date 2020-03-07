import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import authenticate from '../middleware/authenticate';

const authRouters = Router();
authRouters
	.post('/users/authenticate/sign-in', AuthController.signIn)
	.get('/users/authenticate/current', authenticate, AuthController.currentUser);
export default authRouters;
