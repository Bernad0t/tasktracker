import { useCallback, useEffect, useState } from "react"
import ProjectOnPanel from "./components/ProjectOnPanel/ProjectOnPanel"
import css from "./css.module.scss"
import { useAppSelector } from "../../../../../../hooks/useStore"
import { ProjectSliceManager } from "../../../../../../entities/store/featuries/projectSlice"
import { ProjectListAdapted } from "../../../../../../entities/schemas/adaptedSchemas/project"

export default function ProjectList(){ // скорее всего тут надо будет фетчить по group и typechat
    const projects = useAppSelector(ProjectSliceManager.selectors.selectAllProjects)
    const [localProjects, setLocalProjects] = useState(projects)

    useEffect(() => {
        setLocalProjects(projects)
    }, [projects])

    const handleClick = useCallback((project: ProjectListAdapted) => {
        const newChats = localProjects.map(proj => proj.id === project.id ? {...proj, active: true, numberNewMessage: 0}: {...proj, active: false})
        setLocalProjects(newChats)
    }, [localProjects])

    return(
        <div className={css.wrapper}>
            {localProjects.map(proj => <ProjectOnPanel key={proj.id} project={proj} callback={handleClick}/>)}
        </div>
    )
}