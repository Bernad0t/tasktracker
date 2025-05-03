import { memo, useCallback, useState } from "react";
import { ProjectSliceManager } from "../../../entities/store/featuries/projectSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { Role } from "../../../entities/schemas/enums/project";
import { UserDataDTO, UserDataRolesDTO } from "../../../entities/schemas/dto/userDTO";
import AddUserPanel, { OneUser } from "../../components/AddUserPanel/AddUserPanel";
import BlueSelect from "../../UI/select/BlueSelect";
import image from "../../../assets/imgs/delete.png"
import ButtonLikeText from "../../UI/buttons/ButtonLikeText/ButtonLikeText";
import css from "./css.module.scss"
import LoadingComponent from "../../components/LoadingComponent";
import ModalBase from "../modalBase/modalBase";

interface Props{
    projectId: number
    isOpen: boolean
    handleClose: () => void
}

const OneRow = memo(function({user, handleDelete, handleChange}: {
    user: UserDataRolesDTO, handleDelete: (id: number) => void, handleChange: ((id: number, role: Role) => void)
}){
    return(
        <div className={css.onerow}>
            <OneUser user={user}/>
            <div className={css.tools}>
                <div className={css.select}>
                    <BlueSelect onChange={(e) => handleChange(user.id, e.target.value as unknown as Role)}>
                        <option selected={user.role == Role.user} value={Role.user}>{"Участник"}</option>
                        <option selected={user.role == Role.admin} value={Role.admin}>{"Админ"}</option>
                    </BlueSelect>
                </div>
                <img src={image} alt="" onClick={() => handleDelete(user.id)}/>
            </div>
        </div>
    )
})

export default function ManageUsersInProject({projectId, isOpen, handleClose}: Props){
    const project = useAppSelector(state => ProjectSliceManager.selectors.selectProjectById(state, projectId))
    const [localUsers, setLocalUsers] = useState<UserDataRolesDTO[]>(project?.users ?? [])
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()

    const handleSelect = useCallback((user: UserDataDTO) => {
        if (!localUsers.find(us => us.id === user.id)){
            setLocalUsers([...localUsers, {...user, role: Role.user}])
        }
    }, [localUsers])

    const handleSave = () => {
        if (project){
            setIsLoading(true)
            dispatch(ProjectSliceManager.fetching.updateProject({...project, users: localUsers}))
            .then(() => handleClose())
            .finally(() => setIsLoading(false))
        }
    }

    return(
        <ModalBase
            isOpen={isOpen}
            onRequestClose={() => handleClose()}
        >
            <LoadingComponent loading={isLoading} className={css.wrapper}>
                <AddUserPanel handleSelect={handleSelect}/>
                {localUsers.map(us => 
                    <OneRow 
                        key={us.id}
                        user={us} 
                        handleDelete={(id: number) => setLocalUsers(state => state.filter(us => us.id !== id))}
                        handleChange={
                            (id: number, role: Role) => setLocalUsers(state => state.map(us => us.id === id ? {...us, role: role}: us))
                        }
                    />
                )}
                <div className={css.wrapBut}>
                    <div className={css.oneBut}>
                        <ButtonLikeText onClick={() => handleClose()}>Отмена</ButtonLikeText>
                    </div>
                    <div className={css.oneBut}>
                        <ButtonLikeText onClick={handleSave}>Сохранить</ButtonLikeText>
                    </div> 
                </div>
            </LoadingComponent>
        </ModalBase>
    )
}