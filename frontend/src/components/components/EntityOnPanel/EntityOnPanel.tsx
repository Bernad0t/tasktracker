import { HTMLAttributes, ReactNode } from "react"
import css from "./css.module.scss"

interface IBaseEntity<T>{
    id: number
    active?: boolean
    callback?: (param: T) => void
}

interface Props<T extends IBaseEntity<T>> extends HTMLAttributes<HTMLDivElement>{
    entity: T,  
    handleContextMenu?: React.MouseEventHandler<HTMLDivElement>,
    children: ReactNode
}

export default function EntityOnPanelWrapper<T extends IBaseEntity<T>>({entity, handleContextMenu, children}: Props<T>){
    return(
        <div 
            className={css.wrapper} 
            style={{backgroundColor: entity.active ? "#006FFD" : "", color: entity.active ? "white" : ""}} 
            onClick={() => entity.callback ? entity.callback(entity) : {} }
            onContextMenu={handleContextMenu}
        >
            {children}
        </div>
    )
}