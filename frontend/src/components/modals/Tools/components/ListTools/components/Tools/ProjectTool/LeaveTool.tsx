import ListToolBase from "../../../../ListToolBase/ListToolBase";
import { IToolProps } from "../types";
import imageLeave from "../../../../../../../../assets/imgs/leave.png"

export default function LeaveTool({projectId, ...props}: IToolProps){
    return(
        <ListToolBase img={imageLeave} label="Покинуть" {...props}/>
    )
}