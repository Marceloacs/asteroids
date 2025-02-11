import { Router } from 'express';
import signInController from './sign-in/controller';

const AuthRouter = Router();

AuthRouter.post('/sign-in',signInController);

export default AuthRouter;