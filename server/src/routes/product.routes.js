import { Router } from 'express'
import { productValidator } from '../validators/product.validator.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { createProduct } from '../controllers/product.controller.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() })


const router = Router();


router.post("/", authenticate, (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({
            message: "uesr is not authorize to create products"
        })
    }
    next()
}, upload.array("images"), createProduct)


export default router