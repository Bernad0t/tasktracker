import { useCallback, useState } from "react";
import { TypeManipulateWihProjectForm } from "../types";
import { useAppDispatch } from "../../../../hooks/useStore";
import { ProjectBaseDTO } from "../../../../entities/schemas/dto/projectDTO";
import { ProjectSliceManager } from "../../../../entities/store/featuries/projectSlice";
import { ProjectListAdapted } from "../../../../entities/schemas/adaptedSchemas/project";

export default function useSaveChanges(typeManipulate: TypeManipulateWihProjectForm){
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()

    const handleSubmit = useCallback((data: ProjectListAdapted | ProjectBaseDTO) => {
        if (data.name.length !== 0){
            const fetch = async () => {
                if (typeManipulate === TypeManipulateWihProjectForm.add){
                    await dispatch(ProjectSliceManager.fetching.addProject(data))
                } else { // это вызывается только при обновлении проекта, то есть от ProjectListAdapted
                    await dispatch(ProjectSliceManager.fetching.updateProject(data as ProjectListAdapted))
                }
            }
            setIsLoading(true)
            fetch()
            .then(() => setError(""))
            .catch((error) => setError(error?.message))
            .finally(() => setIsLoading(false))
        } else {
            setError("Название не должно быть пустой строкой")
        }
    }, [typeManipulate, dispatch])

    return {handleSubmit, isLoading, error}
}