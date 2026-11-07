import { Router } from 'express'
import { registerValidator } from '../validators/auth.validator.js';

const routes = Router();

routes.post("/register",registerValidator,)


export default routes