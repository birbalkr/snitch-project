import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { readRefreshToken, userToken } from "../utils/auth.utils.js"





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

export async function authlogin(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invlid Email and Password"
        })
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password)

    if (!isPasswordvalid) {
        return res.status(400).json({
            message: "Invalid Email and Password",
        })
    }

    const { accessToken, refreshToken } = userToken({ userId: user._id, role: user.role });

    res.cookie("refreshToken", refreshToken, { httpOnly: true })
    await userModel.findOneAndUpdate({ email }, { refreshToken })

    res.status(200).json({
        message: "Login SuccessFully ....",
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken
        }
    })


    res
}


export async function authrefreshToken(req, res) {
    const newrefreshToken = req.cookies.refreshToken;


    if (!newrefreshToken) {
        return res.status(401).json({
            message: "Refresh token is required."
        })
    }

    try {
        console.log("try");

        const decode = readRefreshToken(newrefreshToken)
        console.log("decode", decode);


        const { userId } = decode

        const user = await userModel.findById(userId)

        if (newrefreshToken != user.refreshToken) {

            await userModel.findByIdAndUpdate(user._id,
                {
                    refreshToken: null,
                    // isAccountFreeze: true
                })

            return res.status(401).json({
                message: "Refresh token mismatch"
            })
        }

        const { accessToken, refreshToken } = userToken({ userId: user._id, role: user.role })
        await userModel.findByIdAndUpdate(user._id, { refreshToken })


        res.cookie("refreshToken", refreshToken, { httpOnly: true })



        res.status(200).json({
            message: "refreshToken change successfully...... ",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                accessToken,
            }
        })


    } catch (error) {
        console.log("catch");
        return res.status(401).json({
            message: "invalid refresh Token"

        })
    }
}

export async function getMe(req, res) {
    const { userId, role } = req.user

    const user = await userModel.findById(userId)

    res.status(200).json({
        message: "User data fetch successfully",
        data: {
            user: {
                email: user.email,
                name: user.name,
                id: user._id
            }
        }
    })
}