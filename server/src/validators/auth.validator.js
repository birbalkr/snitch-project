import { body, validationResult } from 'express-validator'


export const registerValidator = [
    body("email")
        .trim()
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Enter valid email address"),
    body("name")
        .exists().withMessage("Name is required")
        .isString().withMessage("Name must be a string")
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage("Name lenght must be between 2 to 50 characters"),
    body("password")
        .trim()
        .exists().withMessage("Password is required")
        .isString().withMessage("password must be a string")
        .isLength({ min: 6 }).withMessage("Password must be minimum 6 character"),
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