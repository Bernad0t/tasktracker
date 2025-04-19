import { HTMLAttributes } from "react";
import ListToolBase from "../../../../ListToolBase/ListToolBase";
import imageDel from "../../../../../../../../../assets/img/redDelete.png"
import { useAppDispatch } from "../../../../../../../../hooks/useStore";
import { ProjectSliceManager } from "../../../../../../../../entities/store/featuries/projectSlice";
import { IToolProps } from "../types";

export function DeleteTool({onClick, ...props}: HTMLAttributes<HTMLDivElement>){
    return(
        <ListToolBase img={imageDel} label="Удалить" {...props} onClick={onClick}/>
    )
}

export default function DeleteProjectTool({projectId, ...props}: IToolProps){
    const dispatch = useAppDispatch()

    return(
        <DeleteTool {...props} onClick={() => dispatch(ProjectSliceManager.fetching.deleteProject(projectId))}/>
    )
}