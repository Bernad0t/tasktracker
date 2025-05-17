import { useMemo } from "react";
import { TaskDTORelation } from "../../../../../../entities/schemas/dto/taskDTO";
import { StatusTask } from "../../../../../../entities/schemas/enums/project";

export default function useSortedTasks(tasks: TaskDTORelation[]) {
  return useMemo(() => {
    const tempDict = new Map<keyof typeof StatusTask, TaskDTORelation[]>();
    
    Object.keys(StatusTask).filter(key => isNaN(Number(key))).forEach(key => {
      const statusKey = StatusTask[key as keyof typeof StatusTask];
      tempDict.set(
        key as keyof typeof StatusTask, 
        tasks.filter(task => task.status === statusKey)
      );
    });

    return tempDict;
  }, [tasks]); // Зависит только от tasks
}