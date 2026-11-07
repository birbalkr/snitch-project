import { Router } from 'express'
import { loginValidator, registerValidator } from '../validators/auth.validator.js';
import { authlogin, authrefreshToken, authRegister } from '../controllers/auth.controller.js';

const routes = Router();

routes.post("/register", registerValidator, authRegister)
routes.post("/login", loginValidator, authlogin)
routes.post("/refresh", authrefreshToken)

export default routes