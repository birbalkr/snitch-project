import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'


export function createAccessToken({ userId, role }) {
    const accessToken = jwt.sign({
        userId, role
    },config.ACCESS_TOKEN)
} 