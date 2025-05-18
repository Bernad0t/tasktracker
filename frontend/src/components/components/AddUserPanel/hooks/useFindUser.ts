import { useEffect, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import ApiQuery from '../../../../api/QueryController';
import { UserDataDTO } from '../../../../entities/schemas/dto/userDTO';

export default function useFindUser(searchStr: string) {
    const [users, setUsers] = useState<UserDataDTO[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const requestedStr = useDebounce(searchStr, 500);

    useEffect(() => {
        const controller = new AbortController();
        if (requestedStr.length !== 0) {
            setIsSearching(true);
            ApiQuery.user
                .findUsers(requestedStr, controller.signal)
                .then(data => setUsers(data ?? []))
                .finally(() => setIsSearching(false));
        }
        return () => controller.abort();
    }, [requestedStr]);

    return { users, isLoading: isSearching };
}
