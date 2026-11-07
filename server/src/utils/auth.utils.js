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

export function createAccessToken({ userId, role }) {
    const accessToken = jwt.sign({
        userId, role
    }, config.ACCESS_TOKEN, { expiresIn: '15Min' })

    return accessToken;
}

export function createRefreshToken({ userId, role }) {
    const refreshToken = jwt.sign({
        userId, role
    }, config.REFRESH_TOKEN, { expiresIn: "7Days" })

    return refreshToken
}