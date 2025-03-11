import dotenv from "dotenv";

dotenv.config();

const expireAccessToken = 60 * 24 * 15 // min

export default class SessionConfig{
    // token
    SECRET_KEY_TOKEN = process.env.SECRET_KEY_TOKEN
    ALGORITHM = process.env.ALGORITHM
    EXPIRE_REFRESH_TOKEN = 60 * 24 * 30  // min
    EXPIRE_ACCESS_TOKEN = expireAccessToken
    // cookie
    EXPIRE_COOKIE = expireAccessToken
}