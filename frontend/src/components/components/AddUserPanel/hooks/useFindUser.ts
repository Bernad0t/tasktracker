import { useEffect, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import ApiQuery from "../../../../api/QueryController";
import { UserDataDTO } from "../../../../entities/schemas/dto/userDTO";

export default function useFindUser(searchStr: string){
    const [users, setUsers] = useState<UserDataDTO[]>([])
    const requestedStr = useDebounce(searchStr, 500)

    useEffect(() => {
        const controller = new AbortController()
        ApiQuery.user.findUsers(requestedStr, controller.signal)
        .then((data) => setUsers(data??[]))
        return () => controller.abort()
    }, [requestedStr])

    return users
}