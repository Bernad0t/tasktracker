import { useCallback } from "react";
import ApiQuery from "../../../../../../../../api/QueryController";
import { TaskDTORelation } from "../../../../../../../../entities/schemas/dto/taskDTO";
import { StatusTask } from "../../../../../../../../entities/schemas/enums/project";
import { ProjectSliceManager } from "../../../../../../../../entities/store/featuries/projectSlice";
import { useAppDispatch, useAppSelector } from "../../../../../../../../hooks/useStore";
import { store } from "../../../../../../../../entities/store/store";

export default function useHandleDrop(typeWrapper: StatusTask, ref: React.RefObject<HTMLDivElement | null>){
    const dispatch = useAppDispatch()
    // const project = useAppSelector(ProjectSliceManager.selectors.selectSelected)

    const checkIfInsideDiv = useCallback((x: number, y: number) => {
        if (!ref.current) return false;

        // Получаем границы элемента
        const rect = ref.current.getBoundingClientRect();

        // Проверяем, находятся ли координаты внутри div
        return (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        );
    },[ref]);

    const drop = useCallback((task: TaskDTORelation, {x, y}: {x: number, y: number}) => {
        const currentProject = ProjectSliceManager.selectors.selectSelected(store.getState()) // почему-то замыкание странно работает, не обновляя project
        if (checkIfInsideDiv(x, y) && currentProject){
            const newTask = {...task, status: typeWrapper}
            dispatch(ProjectSliceManager.redusers.updateSelect({
                ...currentProject, 
                tasks: currentProject?.tasks?.map(projtask => task.id === projtask.id ? newTask : projtask)
            }))
            ApiQuery.task.updateTask(newTask)
        }
    },[checkIfInsideDiv, dispatch, typeWrapper])

    return drop
}