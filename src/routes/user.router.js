import { Router } from 'express';
import UserController from '../controllers/userController';

const userRouters = Router();
userRouters
	.get('/users', UserController.index)
	.post('/users', UserController.create)
	.get('/users/:id', UserController.find)
	.put('/users/:id', UserController.update);
export default userRouters;
