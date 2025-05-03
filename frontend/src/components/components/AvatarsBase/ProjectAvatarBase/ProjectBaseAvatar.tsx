import { HTMLAttributes } from "react";
import css from "./css.module.scss"
import projImg from "../../../../assets/imgs/projAvatar.png"

export default function ProjectBaseAvatar({...props}: HTMLAttributes<HTMLDivElement>){
    return(
        <div className={css.wrapper} {...props}>
            <img src={projImg} alt="" />
        </div>
    )
}