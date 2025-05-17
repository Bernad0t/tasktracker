import { useRef, useState } from "react";
import LoadingComponent from "../../components/loadingComponent";
import css from "./css.module.scss"
import ProjectBaseAvatar from "../../components/AvatarsBase/ProjectAvatarBase/ProjectBaseAvatar";
import { InputAuthorizationRow } from "../../components/AuthorizationRow/AuthorizationRow";
import { LabelsProjectForm, PlaceholdersProjectForm, TypeManipulateWihProjectForm } from "./types";
import AuthorizationBatton from "../../UI/buttons/AuthorizationButtons/AuthorizationButton";
import { initialProjectBaseDTO, ProjectBaseDTO } from "../../../entities/schemas/dto/projectDTO";
import useSaveChanges from "./hooks/useSaveChanges";
import ErrorMessage from "../../components/stylingString/errorMessage";

export default function ProjectForm({project, whatIs}: {project?: ProjectBaseDTO, whatIs: TypeManipulateWihProjectForm}){ // предполагается, что ModalBase оборачивает этот компонент
    const [localProject, setLocalProject] = useState(project??initialProjectBaseDTO)// добавление пользователей на страннице проекта будет
    const keysUpdatable = useRef(Object.keys(initialProjectBaseDTO))

    const {isLoading, handleSubmit, error} = useSaveChanges(whatIs)
    return(
        <div className={css.wrapper}>
            <LoadingComponent loading={isLoading}>
                <div className={css.wrapperAvatarModule}>
                    <div className={`${css.wrapperAvatar} ${css.wrappers}`}>
                        <div style={{width: "150px", position: "relative"}}>
                            <ProjectBaseAvatar style={{height: "100%"}}/>
                        </div>
                    </div>
                    <div className={`${css.wrappers}`} style={{marginTop: "10px"}}>
                        <h3>{project?.name}</h3>
                    </div>
                </div>
                <div className={css.info}>
                    {keysUpdatable.current.map(
                        (key) => 
                        <InputAuthorizationRow
                            key={key} 
                            label={LabelsProjectForm[key as keyof typeof LabelsProjectForm]}
                            keyField={key} 
                            placeholder={PlaceholdersProjectForm[key as keyof typeof PlaceholdersProjectForm]}
                            value={localProject && localProject[key as keyof typeof localProject] as string} 
                            onChange={(e) => setLocalProject((prev) => ({...prev, [key]: e.target.value}))}
                        />
                    )}
                    <div style={{position: "absolute", bottom: 0, width: "100%"}}>
                        <AuthorizationBatton onClick={() => handleSubmit(localProject)}>
                            {whatIs === TypeManipulateWihProjectForm.update ? <>Сохранить изменения</> : <>Добавить</>}
                        </AuthorizationBatton>
                        <ErrorMessage>{error}</ErrorMessage>
                    </div>
                </div>
            </LoadingComponent>
        </div>
    )
}