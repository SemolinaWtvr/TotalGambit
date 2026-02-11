import { Router } from 'express';
import defaultController from '../controllers/default.controller.js';

const defaultRouter = Router();

defaultRouter.route('/default/login')
    .post(defaultController.login);
    
defaultRouter.route('/default/register')
    .post(defaultController.register);


export default defaultRouter;