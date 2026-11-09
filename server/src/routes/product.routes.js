import { Router } from 'express'
import { productValidator } from '../validators/product.validator';


const router = Router();


router.post("/",productValidator,)


export default router