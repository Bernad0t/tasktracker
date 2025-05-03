import { HTMLAttributes } from "react"
import css from "./css.module.scss"

interface IBaseEntity{
    id: number
    active?: boolean
}

interface Props<T extends IBaseEntity> extends HTMLAttributes<HTMLDivElement>{
    entity: T
}

export default function EntityOnPanelWrapper<T extends IBaseEntity>({entity, children, ...props}: Props<T>){
    return(
        <div 
            className={entity.active === undefined ? css.nothovering : entity.active ? css.wrapperActive : css.wrapper}
            {...props}
        >
            {children}
        </div>
    )
}