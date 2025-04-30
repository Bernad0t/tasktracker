import ListToolBase from "../../../../ListToolBase/ListToolBase";
import { IToolProps } from "../types";
import image from "../../../../../../../../assets/imgs/profilePassive.png"
import ManageUsersInProject from "../../../../../../ManageUsersInProject/ManageUsersInProject";
import { useState } from "react";

export default function AddUSerTool({projectId, ...props}: IToolProps){
    const [isOpen, setIsOpen] = useState(false)
    return(
        <>
        <ListToolBase img={image} label="Участники" {...props} onClick={() => setIsOpen(true)}/>
        <ManageUsersInProject projectId={projectId} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </>
    )
}