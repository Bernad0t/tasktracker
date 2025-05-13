import { memo, useRef, useState } from "react";
import { TaskDTORelation } from "../../../../../../../entities/schemas/dto/taskDTO";
import { StatusTask } from "../../../../../../../entities/schemas/enums/project";

const OneTask = memo(function({task}: {task: TaskDTORelation}){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseEnter = () => {
        setIsOpen(true); // Показываем панель
    };

    const handleMouseLeave = () => {
        setIsOpen(false); // Скрываем панель
    };
    return(
        <>
        <div 
            ref={ref}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >

        </div>
        </>
    )
})

export default function TaskTypeWrapper({tasks, statusName}: {tasks: TaskDTORelation[], statusName?: StatusTask}){
    return(
        <div>
            <div>
                {statusName ? statusName : "Не назначены"}
            </div>
            <div>
                {tasks.map(task => <OneTask key={task.id} task={task}/>)}
            </div>
        </div>
    )
}