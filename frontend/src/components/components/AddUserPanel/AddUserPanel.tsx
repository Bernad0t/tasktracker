import { memo, useCallback, useState } from "react";
import useFindUser from "./hooks/useFindUser";
import SearchInput from "../../UI/inputs/SearchInput/SearchInput";
import { UserDataDTO } from "../../../entities/schemas/dto/userDTO";
import EntityOnPanelWrapper from "../EntityOnPanel/EntityOnPanel";
import { IAddUser } from "../../../entities/schemas/adaptedSchemas/user";
import PersonBaseAvatar from "../AvatarsBase/PersonBaseAvatar/PersonBaseAvatar";
import css from "./css.module.scss"
import LoadingComponent from "../loadingComponent";

function TextInfo({user}: {user: UserDataDTO}){
    return(
        <div className={css.wrapperText}>
            <div>
                <b>{user.username}</b>
            </div>
        </div>
    )
}

export const OneUser = memo(function ({user, ...props}: IAddUser){
    return(
        <EntityOnPanelWrapper
            {...props}
        >
            <PersonBaseAvatar/>
            <TextInfo user={user}/>
        </EntityOnPanelWrapper>
    )
})

export default function AddUserPanel({handleSelect}: {handleSelect: (user: UserDataDTO) => void}){
    const [search, setSearch] = useState("")
    const {users, isLoading} = useFindUser(search) // по сути приходит только один пользователь

    const handleClick = useCallback((user: UserDataDTO) => {
        setSearch("")
        handleSelect(user)
    }, [handleSelect])

    return(
        <div className={css.wrapper}>
            <div>
                <SearchInput onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <LoadingComponent loading={isLoading}>
                <div className={css.users}>
                    {users.map(us => 
                    <OneUser 
                        user={us} 
                        onClick={() => handleClick(us)}
                        className={css.wrapperEntityOnPanel}
                    />)}
                </div>
            </LoadingComponent>
        </div>
    )
}