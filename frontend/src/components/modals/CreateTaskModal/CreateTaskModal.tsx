import ModalBase from "../modalBase/modalBase";
import { initialTaskDTO, TaskDTO } from "../../../entities/schemas/dto/taskDTO";
import AuthorizationBatton from "../../UI/buttons/AuthorizationButtons/AuthorizationButton";
import { useAppSelector } from "../../../hooks/useStore";
import { UserSliceManager } from "../../../entities/store/featuries/userSlice";
import * as Yup from 'yup'
import { FieldErrors, useForm, UseFormSetValue } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputAuthorizationRow } from "../../components/AuthorizationRow/AuthorizationRow";
import { ICreateTaskProps, LabelCreatePropsEnum } from "./types";
import { OneUser } from "../../components/AddUserPanel/AddUserPanel";
import ErrorMessage from "../../components/stylingString/errorMessage";
import css from "./css.module.scss"
import LoadingComponent from "../../components/loadingComponent";
import { useEffect } from "react";
import { ProjectDTORelation } from "../../../entities/schemas/dto/projectDTO";
import BlueScroll from "../../components/stylingString/BlueScroll/BlueScroll";

const schema = Yup.object().shape({
    name: Yup.string().required("Должно быть заполнено"),
    assigned: Yup.number().positive("Выберите пользователя").required("Должно быть заполнено"),
    project: Yup.number().required("Должно быть заполнено"),

})
const keyFieldsInput = ["name", "description"]

function AssignedBar({project, errors, assigned, setValue}: {
    project: ProjectDTORelation, 
    errors: FieldErrors<TaskDTO>, 
    assigned: number, 
    setValue: UseFormSetValue<TaskDTO>
}){
    return(
        <>
        <BlueScroll label={`Назначена на ${project.users?.find(us => us.id === assigned)?.username ?? ""}`}/>
        <ErrorMessage>{errors.assigned?.message}</ErrorMessage>
        <div className={css.users}>
            {project.users?.map( us => 
                <OneUser 
                    user={us} 
                    className={us.id === assigned ? css.oneUserAssigned : css.oneUser} 
                    onClick={() => setValue("assigned", us.id)}
                />
            )}
        </div>
        </>
    )
}

export default function CreateTaskModal({project, isOpen, handleClose, onSubmit, existingTask}: ICreateTaskProps){
    const user = useAppSelector(UserSliceManager.selectors.selectUser)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { isLoading, errors },
    } = useForm<TaskDTO>({
        defaultValues: existingTask ?? {...initialTaskDTO, reviewer: user.id, project: project.id},
        resolver: yupResolver(schema)
    })
    const assigned = watch("assigned")

    useEffect(() => {
        !isOpen && reset()
        return () => console.log("dem CreateTaskModal")
    }, [isOpen, reset])

    return( // дедлайн добавить
        <ModalBase
            isOpen={isOpen}
            onRequestClose={handleClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={css.wrapper}>
                <div className={css.header}>
                    <h3>Добавить задачу в {project.name}</h3>
                </div>
                <LoadingComponent loading={isLoading}>
                    <div className={css.content}>
                        <div>
                            {keyFieldsInput.map(key => 
                                <InputAuthorizationRow
                                    key={key}
                                    {...register(key as keyof typeof initialTaskDTO)}
                                    placeholder={`Input ${key}`}
                                    label={LabelCreatePropsEnum[key as keyof typeof LabelCreatePropsEnum]}
                                    error={errors[key as keyof typeof errors]?.message}
                                />
                            )}
                        </div>
                        <InputAuthorizationRow 
                            {...register("deadline")}
                            placeholder={"deadline"}
                            label="Дедлайн задачи"
                            type="date"
                        />
                        <AssignedBar project={project} assigned={assigned} setValue={setValue} errors={errors}/>
                    </div>
                    <div className={css.but}>
                        <AuthorizationBatton type="submit">Добавить</AuthorizationBatton>
                    </div>
                </LoadingComponent>
            </form>
        </ModalBase>
    )
}