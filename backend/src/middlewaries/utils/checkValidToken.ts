import jwt from "jsonwebtoken"
import sessionConf from "../../config/sessionConf"

export default function decodeToken(token: string){
    try{
        return jwt.verify(token, sessionConf.SECRET_KEY_TOKEN)
    }
    catch(err){
        console.error(err)
        return
    }
}