import { useState } from "react";
import { IToolProps } from "../types";
import ListToolBase from "../../../../ListToolBase/ListToolBase";
import ModalBase from "../../../../../../modalBase/modalBase";
import { useGetManageProjectModalContext } from "../../../../../hooks/useManageProjectModalContext";
import ProjectForm from "../../../../../../ProjectForm/ProjectForm";
import { useAppSelector } from "../../../../../../../../hooks/useStore";
import { ProjectSliceManager } from "../../../../../../../../entities/store/featuries/projectSlice";
import { TypeManipulateWihProjectForm } from "../../../../../../ProjectForm/types";
import imageChange from "../../../../../../../../assets/imgs/rename.png"

export default function UpdateProjectTool({projectId, ...props}: IToolProps){
    const [isOpen, setIsOpen] = useState(false) // нужно не спешить с закрытием основного модального окна. при закрытии вложенного буду закрывать оба
    const project = useAppSelector(state => ProjectSliceManager.selectors.selectProjectById(state, projectId))
    const toolManager = useGetManageProjectModalContext()
    
    const handleClose = () => {
        setIsOpen(false)
        toolManager?.handleClose()
    }
    return(
        <>
            <ListToolBase img={imageChange} label="Редактировать" {...props} onClick={() => setIsOpen(true)}/>
            <ModalBase
                isOpen={isOpen}
                onRequestClose={handleClose}
            >
                <ProjectForm project={project} whatIs={TypeManipulateWihProjectForm.update}/>
            </ModalBase>
        </>
    )
}