import css from "./css.module.scss"
import plusImg from "../../../../../../../assets/imgs/add.png"
import EntityOnPanelWrapper from "../../../../../../components/EntityOnPanel/EntityOnPanel"
import { ImgHTMLAttributes, useState } from "react"
import CreateTaskModal from "../../../../../../modals/CreateTaskModal/CreateTaskModal"
import ApiQuery from "../../../../../../../api/QueryController"
import { TaskDTO } from "../../../../../../../entities/schemas/dto/taskDTO"
import { useAppDispatch } from "../../../../../../../hooks/useStore"
import { ProjectSliceManager } from "../../../../../../../entities/store/featuries/projectSlice"
import { ProjectListAdapted } from "../../../../../../../entities/schemas/adaptedSchemas/project"
import ProjectBaseAvatar from "../../../../../../components/AvatarsBase/ProjectAvatarBase/ProjectBaseAvatar"

function CreateTask({src, ...props}: ImgHTMLAttributes<HTMLImageElement>){
    return(
        <div className={css.onetool} {...props}>
            <img src={src} alt="" />
        </div>
    )
}

export default function PanelProject({project}: {project: ProjectListAdapted}){
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useAppDispatch()
    const submit = (task: TaskDTO) => {
        ApiQuery.task.addTask(task)
        .then(id => {
            dispatch(ProjectSliceManager.redusers.updateSelect(
                {...project, tasks: [...(project.tasks??[]), {...task, comments: [], id: id}]}
            ))
            setIsOpen(false)
        })
    }
    return(
        <>
        <div className={css.panel}>
            <EntityOnPanelWrapper className={css.chatInfo}>
                <ProjectBaseAvatar className={css.avatar}/>
                <div className={css.wrapperText}>
                    <b>{project.name}</b>
                </div>
            </EntityOnPanelWrapper>
            <div className={css.tools}>
                <CreateTask src={plusImg} onClick={() => setIsOpen(true)}/>
            </div>
        </div>
        <CreateTaskModal
            isOpen={isOpen}
            project={project}
            handleClose={() => setIsOpen(false)}
            onSubmit={submit}
        />
        </>
    )
}