import css from "./css.module.scss"
import template_css from "../../../../../assets/MixinCss/classes.module.scss" 
import { ProjectListAdapted } from "../../../../../entities/schemas/adaptedSchemas/project"
import { useEffect, useState } from "react"
import ApiQuery from "../../../../../api/QueryController"
import { ProjectContext } from "./hooks/useProjectContext"
import useSortedTasks from "./hooks/useSortedTasks"
import TaskTypeWrapper from "./components/TaskTypeWrapper/TaskTypeWrapper"

export default function SelectedProject({project}: {project: ProjectListAdapted}){
    const [localProject, setLocalProject] = useState(project)
    const dictTasks = useSortedTasks(localProject.tasks ?? [])

    useEffect(() => {
        ApiQuery.project.getSelectedProject(project.id)
        .then((proj) => setLocalProject(proj))
    }, [project])

    return(
        <div>
            <ProjectContext.Provider value={localProject}>
                <div>
                    Тут добавить можно таску
                </div>
                <div>
                    {/* {dictTasks.keys().map(key => <TaskTypeWrapper key={key} statusName={key} tasks={dictTasks.get(key) ?? []}/>)} */}
                </div>
            </ProjectContext.Provider>
        </div>
    )
}