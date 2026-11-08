import { Router } from 'express'
import { loginValidator, registerValidator } from '../validators/auth.validator.js';
import { authlogin, authrefreshToken, authRegister, getMe } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const routes = Router();

routes.post("/register", registerValidator, authRegister)
routes.post("/login", loginValidator, authlogin)
routes.post("/refresh", authrefreshToken)
routes.get("/me", authenticate, getMe)

export default routes