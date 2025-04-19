import { memo } from "react";
import css from "./css.module.scss"
import useContextMenu from "../../../../../hooks/useContextMenu";
import ProjectBaseAvatar from "../../../../../../../components/AvatarsBase/ProjectAvatarBase/ProjectBaseAvatar";
import { ProjectListAdapted } from "../../../../../../../../entities/schemas/adaptedSchemas/project";
import ProjectToolModal from "../../../../../../../modals/Tools/ProjectToolModal";

function AvatarProject(){
    return(
        <div className={css.wrapperAvatar}>
            <ProjectBaseAvatar/>
        </div>
    )
}

function TextInfo({projectName, description, active}: {projectName: string, description?: string, active: boolean}){
    return(
        <div className={css.wrapperText}>
            <div>
                <b>{projectName}</b>
            </div>
            <div className={css.lastMes} style={{color: active ? "white" : ""}}>
                {description}
            </div>
        </div>
    )
}

interface Props extends ProjectListAdapted{
    callback: (id: number) => void
}

const ProjectOnPanel = memo(({...project}: Props) => {
    const {handleContextMenu, showTools, setShowTools, coordinates} = useContextMenu()
    return(
        <>
        <div 
            className={css.wrapperChat} 
            style={{backgroundColor: project.active ? "#006FFD" : "", color: project.active ? "white" : ""}} 
            onClick={() => project.callback(project.id)}
            onContextMenu={handleContextMenu}
        >
            <AvatarProject/>
            <TextInfo projectName={project.name} description={project.description} active={project.active}/>
        </div>
        <ProjectToolModal 
            project={project} 
            isOpen={showTools} 
            setIsOpen={setShowTools}
            coordinates={coordinates}
        />
        </>
    )
})

export default ProjectOnPanel