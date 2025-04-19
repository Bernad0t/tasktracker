import { memo, ReactNode} from "react"
import css from "./css.module.scss"
import { IPanelTools } from "../../types"
import ImageButtonBase from "../../../../UI/buttons/ImageButtonBase/ImageButtonBase"

function OneButton({children}: {children: ReactNode}){
    return(
        <div 
            className={css.oneBut}
        >
            {children}
        </div>
    )
}

const OneButtonMemo = memo(OneButton)

export default function MainTools({buttons}: {buttons: IPanelTools[]}){
    return(
        <div style={{width: "100%", height: "100%"}}>
            {buttons.map((button) => 
                <OneButtonMemo>{
                    <ImageButtonBase src={button.imgSrc} onClick={button.handleClick}/>
                }</OneButtonMemo>
            )}
        </div>
    )
}