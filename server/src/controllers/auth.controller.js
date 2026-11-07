import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { userToken } from "../utils/auth.utils.js"





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

    const user = await userModel.create({
        name,
        email,
        password: await bcrypt.hash(password, 12)
    })

    const { accessToken, refreshToken } = userToken({ userId: user._id, role: user.role })


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })

    await userModel.findByIdAndUpdate(user._id, { refreshToken })

    res.status(200).json({
        message: "user create successfully",
        data: {
            user: {
                email: user.email,
                name: user.name,
                id: user._id
            },
            accessToken
        }
    })
}