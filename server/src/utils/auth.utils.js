import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'


export function userToken({ userId, role }) {
    const accessToken = jwt.sign({
        userId, role
    }, config.ACCESS_TOKEN, { expiresIn: '15Min' })

    const refreshToken = jwt.sign({
        userId, role
    }, config.REFRESH_TOKEN, { expiresIn: "7Days" })


    return { accessToken, refreshToken };
}

export function readRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, config.REFRESH_TOKEN)

}


export function readAccessToken(accessToken) {
    return jwt.verify(accessToken, config.ACCESS_TOKEN)
}