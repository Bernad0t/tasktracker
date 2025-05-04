import { HTMLAttributes } from "react"
import css from "./css.module.scss"

export default function EntityOnPanelWrapper({children, ...props}: HTMLAttributes<HTMLDivElement>){
    return(
        <div 
            className={`${props.className} ${css.nothoveringEntityOnPanel}`}
            {...props}
        >
            {children}
        </div>
    )
}