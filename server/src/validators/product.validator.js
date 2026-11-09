import { body, validationResult } from "express-validator";


export const productValidator = [
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a string").bail()
        .trim()
        .isLength({ min: 2, max: 200 }).withMessage("Title length must be  2 to 200 characters").bail()
        .isAlpha("en-US", { ignore: " " }).withMessage("Title can only have english small case and capital case characters"),
    body("description")
        .exists().withMessage("description is required").bail()
        .isString().withMessage("description must be string").bail()
        .trim()
        .isLength({ min: 20, max: 500 }).withMessage("description length must be between 20 to 500 characters").bail(),
    body("price.amount")
        .exists().withMessage("price amount is required").bail()
        .isFloat().withMessage("price amount must be floating number and must be greater than 0.").bail(),
    body("price.currency")
        .exists().withMessage("Currency is required").bail()
        .isString().withMessage("Currency must be a string value").bail()
        .isIn(["INR", "USD"]).withMessage().bail(),
    body("sizes")
        .exists().withMessage("Size are required").bail()
        .isArray().withMessage("Size must be an array of object"),
    body("sizes.*.stock")
        .exists().withMessage("stock must be present in every entry of the size array").bail()
        .isInt({ min: 0 }).withMessage("Stock must be a integer value"),
    (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Request",
                error: error.array()
            })
        }

        next()
    }

]