import { memo } from "react";
import css from "./css.module.scss"
import useContextMenu from "../../../../../hooks/useContextMenu";
import ProjectBaseAvatar from "../../../../../../../components/AvatarsBase/ProjectAvatarBase/ProjectBaseAvatar";
import { ProjectListAdapted } from "../../../../../../../../entities/schemas/adaptedSchemas/project";
import ProjectToolModal from "../../../../../../../modals/Tools/ProjectToolModal";
import EntityOnPanelWrapper from "../../../../../../../components/EntityOnPanel/EntityOnPanel";
import TextInfo from "../../../../../../../components/TextInfo/TextInfo";

function AvatarProject(){
    return(
        <div className={css.wrapperAvatar}>
            <ProjectBaseAvatar/>
        </div>
    )
}

interface Props{
    project: ProjectListAdapted
    callback: (project: ProjectListAdapted) => void
}

const ProjectOnPanel = memo(({project, callback}: Props) => {
    const {handleContextMenu, showTools, setShowTools, coordinates} = useContextMenu()
    return(
        <>
        <EntityOnPanelWrapper 
            className={project.active ? css.wrapperActiveEntityOnPanel : css.wrapperEntityOnPanel}
            onClick={() => callback(project)}
            onContextMenu={handleContextMenu}
        >
            <AvatarProject/>
            <TextInfo title={project.name} description={project.description}/>
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