import { Router } from 'express';
import userRouters from './user.router';
const routers = Router();

routers.use(userRouters);

export default routers;
