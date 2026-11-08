import { readAccessToken } from "../utils/auth.utils.js"

export function authenticate(req, res, next) {

    const accessToken = req.headers.authorization?.split(" ")[1]
    
    if (!accessToken) {
        return res.status(400).json({
            message: "Access token not found in the request."
        })
    }

    try {
        const decode = readAccessToken(accessToken)

        req.user = decode

        next()

    } catch (error) {
        res.status(400).json({
            message: "Invalid or expired AccessToken."
        })

    }
}