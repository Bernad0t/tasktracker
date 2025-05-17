import { HTMLAttributes } from "react";
import css from "./css.module.scss"
import projImg from "../../../../assets/imgs/projAvatar.png"

export default function ProjectBaseAvatar({className, ...props}: HTMLAttributes<HTMLDivElement>){
    return(
        <div className={`${css.wrapper} ${className}`} {...props}>
            <img src={projImg} alt="" />
        </div>
    )
}