import { HTMLAttributes, ReactNode } from "react"
import css from "./css.module.scss"

interface IBaseEntity{
    id: number
    active?: boolean
    callback: (id: number) => void
}

interface Props<T extends IBaseEntity> extends HTMLAttributes<HTMLDivElement>{
    entity: T,  
    handleContextMenu?: React.MouseEventHandler<HTMLDivElement>,
    children: ReactNode
}

export default function EntityOnPanelWrapper<T extends IBaseEntity>({entity, handleContextMenu, children}: Props<T>){
    return(
        <div 
            className={css.wrapper} 
            style={{backgroundColor: entity.active ? "#006FFD" : "", color: entity.active ? "white" : ""}} 
            onClick={() => entity.callback(entity.id)}
            onContextMenu={handleContextMenu}
        >
            {children}
        </div>
    )
}