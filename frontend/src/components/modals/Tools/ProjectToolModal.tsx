import ReactModal from "react-modal";
import css from "./css.module.scss"
import { ProjectToolProps } from "./types";
import ListTools from "./components/ListTools/ListToolsWrapperTemplate";
import DeleteProjectTool from "./components/ListTools/components/Tools/ProjectTool/DeleteProjectTool";
import { Role } from "../../../entities/schemas/enums/project";
import { ManageProjectModalContext } from "./hooks/useManageProjectModalContext";
import UpdateProjectTool from "./components/ListTools/components/Tools/ProjectTool/UpdateProjectTool";
import LeaveTool from "./components/ListTools/components/Tools/ProjectTool/LeaveTool";

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
    console.log(project)
    return( // надо будет сделать фичу для покидания проекта
        <ModalTool 
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
        >
            <ManageProjectModalContext.Provider value={{handleClose: () => setIsOpen(false)}}>
                {project &&
                    <div style={{left: coordinates.x, top: coordinates.y}} className={css.conteiner}>
                        <ListTools>
                            {
                                project.role === Role.admin && 
                                <>
                                <UpdateProjectTool projectId={project.id}/>
                                <DeleteProjectTool projectId={project.id}/>
                                </>
                            }    
                            <LeaveTool projectId={project.id}/>

                        </ListTools> 
                    </div>
                }
            </ManageProjectModalContext.Provider>
        </ModalTool>
    )
}