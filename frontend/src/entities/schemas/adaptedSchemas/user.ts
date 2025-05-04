import { HTMLAttributes } from "react"
import { UserDataDTO } from "../dto/userDTO"

export interface IAddUser extends HTMLAttributes<HTMLDivElement>{
    user: UserDataDTO
}