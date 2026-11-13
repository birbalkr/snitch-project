import { Router } from 'express'
import { productValidator } from '../validators/product.validator.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { createProduct } from '../controllers/product.controller.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files:5,
        fileSize: 1 * 1024 * 1024
    },
})


const router = Router();


router.post("/", authenticate,
    (req, res, next) => {
        if (req.user.role !== "seller") {
            return res.status(403).json({
                message: "uesr is not authorize to create products"
            })
        }
        next()
    },
    upload.array("images"),
    (req, res, next) => {
        req.body.price = JSON.parse(req.body.price)
        req.body.size = JSON.parse(req.body.sizes)
        next()
    },
    createProduct)


export default router