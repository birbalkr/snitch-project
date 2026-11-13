import dotenv from 'dotenv'
dotenv.config();


export const config = {
    MONGO_URL: process.env.MONGO_URL,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    IMAGEKIT: process.env.IMAGEKIT
}
