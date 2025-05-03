import { HTMLAttributes } from "react";
import ListToolBase from "../../../../ListToolBase/ListToolBase";
import imageDel from "../../../../../../../../assets/imgs/redDelete.png"
import { useAppDispatch } from "../../../../../../../../hooks/useStore";
import { ProjectSliceManager } from "../../../../../../../../entities/store/featuries/projectSlice";
import { IToolProps } from "../types";
import { useGetManageProjectModalContext } from "../../../../../hooks/useManageProjectModalContext";

export function DeleteTool({onClick, ...props}: HTMLAttributes<HTMLDivElement>){
    return(
        <ListToolBase img={imageDel} label="Удалить" {...props} onClick={onClick}/>
    )
}

export default function DeleteProjectTool({projectId, ...props}: IToolProps){
    const dispatch = useAppDispatch()
    const managerModal = useGetManageProjectModalContext()
    const handleClick = () => {
        dispatch(ProjectSliceManager.fetching.deleteProject(projectId))
        managerModal?.handleClose()
    }
    return(
        <DeleteTool {...props} onClick={handleClick}/>
    )
}