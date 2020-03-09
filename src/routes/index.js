import { Router } from 'express';
import userRouters from './user.router';
import authRouters from './auth.router';
import companyRouters from './company.router';
const routers = Router();

routers.use(userRouters, authRouters, companyRouters);

export default routers;
