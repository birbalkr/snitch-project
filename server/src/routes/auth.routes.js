import { Router } from 'express'
import { loginValidator, registerValidator } from '../validators/auth.validator.js';
import { authlogin, authRegister } from '../controllers/auth.controller.js';

const routes = Router();

routes.post("/register", registerValidator, authRegister)
routes.post("/login", loginValidator,authlogin)

export default routes