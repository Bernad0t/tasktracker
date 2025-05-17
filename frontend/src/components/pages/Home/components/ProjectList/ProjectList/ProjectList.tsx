import { useCallback} from "react"
import ProjectOnPanel from "./components/ProjectOnPanel/ProjectOnPanel"
import css from "./css.module.scss"
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/useStore"
import { ProjectSliceManager } from "../../../../../../entities/store/featuries/projectSlice"
import { ProjectListAdapted } from "../../../../../../entities/schemas/adaptedSchemas/project"

export default function ProjectList(){ // скорее всего тут надо будет фетчить по group и typechat
    const projects = useAppSelector(ProjectSliceManager.selectors.selectAllProjects)
    const dispatch = useAppDispatch()

    const handleClick = useCallback((project: ProjectListAdapted) => {
        const newChats = projects.map(
            proj => proj.id === project.id ? 
            {...proj, active: true, numberNewMessage: 0} : 
            (proj.active ? {...proj, active: false} : proj)
        )
        dispatch(ProjectSliceManager.redusers.updateData(newChats))
        dispatch(ProjectSliceManager.fetching.uploadSelected(project))
    }, [dispatch, projects])

    return(
        <div className={css.wrapper}>
            {projects.map(proj => <ProjectOnPanel key={proj.id} project={proj} callback={handleClick}/>)}
        </div>
    )
}