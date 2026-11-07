import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'




export async function authRegister(req, res) {
    const { name, email, password } = req.body

    const isUserExists = await userModel.findOne({ email })

    if (isUserExists) {
        return res.status(400).json({
            message: "User already exists with this email",
            error: [
                {
                    field: "email",
                    message: "user already exists with this email"
                }
            ]
        })
    }

    const userCreate = await userModel.create({
        name,
        email,
        password: await bcrypt.hash(password, 12)
    })
}