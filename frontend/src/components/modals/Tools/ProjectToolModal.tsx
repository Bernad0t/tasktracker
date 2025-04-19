import ReactModal from "react-modal";
import css from "./css.module.scss"
import { useEffect} from "react";
import { ProjectToolProps } from "./types";
import ListTools from "./components/ListTool/ListTools";
import DeleteProjectTool from "./components/ListTool/components/Tools/ProjectTool/DeleteProjectTool";

export function ModalTool({...props}: ReactModal.Props){
    return(
        <ReactModal 
            {...props}
            overlayClassName={props.overlayClassName??css.overlay}
            className={css.modal}
        >
            {props.children}
        </ReactModal>
    )
}

export default function ProjectToolModal({project, isOpen, coordinates, setIsOpen}: ProjectToolProps){

    useEffect(() => { // удаление чата влечет за собой диспатч в сторе чата => project = null 
        if (!project)
            setIsOpen(false)
    }, [project, setIsOpen])

    return(
        <ModalTool 
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
        >
            {project &&
                <div style={{left: coordinates.x, top: coordinates.y}} className={css.conteiner}>
                    <ListTools>
                        <DeleteProjectTool projectId={project.id}/>    
                    </ListTools> 
                </div>
            }
        </ModalTool>
    )
}