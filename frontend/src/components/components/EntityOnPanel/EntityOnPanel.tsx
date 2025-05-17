import { HTMLAttributes } from "react"
import css from "./css.module.scss"

export default function EntityOnPanelWrapper({children, className, ...props}: HTMLAttributes<HTMLDivElement>){
    return(
        <div 
            className={`${css.nothoveringEntityOnPanel} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}