import { Router } from 'express';
import userRouters from './user.router';
import authRouters from './auth.router';
const routers = Router();

routers.use(userRouters, authRouters);

export default routers;
