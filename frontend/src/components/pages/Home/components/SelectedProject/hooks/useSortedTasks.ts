import { useEffect, useState } from "react";
import { TaskDTORelation } from "../../../../../../entities/schemas/dto/taskDTO";
import { StatusTask } from "../../../../../../entities/schemas/enums/project";

export default function useSortedTasks(tasks: TaskDTORelation[]){
    const [dict, setDict] = useState<Map<StatusTask, TaskDTORelation[]>>(new Map())
    useEffect(() => {
        const tempDict = new Map()
        for (const key of Object.keys(StatusTask)){
            if (tempDict.get(StatusTask[key as keyof typeof StatusTask]))
                continue
            tempDict.set(
                StatusTask[key as keyof typeof StatusTask], 
                tasks.filter(task => task.status === StatusTask[key as keyof typeof StatusTask]) ?? []
            )
            setDict(tempDict)
        } // надо на серваке переписать StatusTask
    }, [tasks])
    return dict
}