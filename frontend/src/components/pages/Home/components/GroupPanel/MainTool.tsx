import { memo, ReactNode, useState} from "react"
import css from "./css.module.scss"
import { IPanelTools } from "../../types"
import ImageButtonBase from "../../../../UI/buttons/ImageButtonBase/ImageButtonBase"
import ModalBase from "../../../../modals/modalBase/modalBase"

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
    const [selectedNode, setSelectedNode] = useState<ReactNode | null>(null)
    return(
        <>
        <div style={{width: "100%", height: "100%"}}>
            {buttons.map((button) => 
                <OneButtonMemo>{
                    <ImageButtonBase src={button.imgSrc} onClick={() => setSelectedNode(button.node)}/>
                }</OneButtonMemo>
            )}
        </div>
        <ModalBase
            isOpen={!!selectedNode}
            onRequestClose={() => setSelectedNode(null)}
        >
            {selectedNode}
        </ModalBase>
        </>
    )
}