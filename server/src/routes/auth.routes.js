import { Router } from 'express'
import { registerValidator } from '../validators/auth.validator.js';
import { authRegister } from '../controllers/auth.controller.js';

const routes = Router();

routes.post("/register", registerValidator, authRegister)


export default routes