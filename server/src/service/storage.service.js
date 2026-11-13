import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";




const client = new ImageKit({
    privateKey:config.IMAGEKIT
});



export async function uploadFile({buffer, fileName}) {
    const response
}