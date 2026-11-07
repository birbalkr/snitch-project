import { body, validationResult } from 'express-validator'


export const registerValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .trim()
        .isEmail().withMessage("Enter valid email address").bail(),
    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a string").bail()
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage("Name lenght must be between 2 to 50 characters").bail(),
    body("password")
        .exists().withMessage("Password is required").bail()
        .trim()
        .isString().withMessage("password must be a string").bail()
        .isLength({ min: 6 }).withMessage("Password must be minimum 6 character").bail(),
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