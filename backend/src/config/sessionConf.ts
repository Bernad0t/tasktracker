import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: __dirname + '/../../.env' });

const expireAccessToken = 7 * 24 * 60 * 60 * 1000 // 7 дней в миллисекундах

class SessionConfig{
    // token
    SECRET_KEY_TOKEN = process.env.SECRET_KEY_TOKEN ?? ""
    ALGORITHM = process.env.ALGORITHM ?? ""
    EXPIRE_REFRESH_TOKEN = expireAccessToken * 2
    EXPIRE_ACCESS_TOKEN = expireAccessToken
    // cookie
    EXPIRE_COOKIE = expireAccessToken
}

export default new SessionConfig()