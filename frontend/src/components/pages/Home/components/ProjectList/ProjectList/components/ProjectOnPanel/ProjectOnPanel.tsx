import { memo } from "react";
import css from "./css.module.scss"
import useContextMenu from "../../../../../hooks/useContextMenu";
import ProjectBaseAvatar from "../../../../../../../components/AvatarsBase/ProjectAvatarBase/ProjectBaseAvatar";
import { ProjectListAdapted } from "../../../../../../../../entities/schemas/adaptedSchemas/project";
import ProjectToolModal from "../../../../../../../modals/Tools/ProjectToolModal";
import EntityOnPanelWrapper from "../../../../../../../components/EntityOnPanel/EntityOnPanel";

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
            <div className={css.lastMes}>
                {description}
            </div>
        </div>
    )
}

interface Props{
    project: ProjectListAdapted
    callback: (project: ProjectListAdapted) => void
}

const ProjectOnPanel = memo(({project, callback}: Props) => {
    const {handleContextMenu, showTools, setShowTools, coordinates} = useContextMenu()
    console.log("showTools", showTools)
    return(
        <>
        <EntityOnPanelWrapper 
            className={project.active ? css.wrapperActiveEntityOnPanel : css.wrapperEntityOnPanel}
            onClick={() => callback(project)}
            onContextMenu={handleContextMenu}
        >
            <AvatarProject/>
            <TextInfo projectName={project.name} description={project.description} active={project.active}/>
        </EntityOnPanelWrapper>
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