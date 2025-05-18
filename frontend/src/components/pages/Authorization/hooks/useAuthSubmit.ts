import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../../hooks/useStore';
import { useCallback, useState } from 'react';
import validateUtil from '../../../../utils/validation.util';
import { AuthorizationProp } from '../../../../entities/schemas/dto/authorizationDTO';
import ApiQuery from '../../../../api/QueryController';
import { UserSliceManager } from '../../../../entities/store/featuries/userSlice';
import core from '../../../../core/core';
import * as Yup from 'yup';
import { ProjectSliceManager } from '../../../../entities/store/featuries/projectSlice';

export default function useAuthSubmit<T extends AuthorizationProp>(
    initialProps: T,
    schemas: Yup.ObjectSchema<T>[],
    errorsKeys: string[],
    methodApi: (data: T) => Promise<void>,
    apiErrorPlaceholder: string,
) {
    const [data, setData] = useState<T>(initialProps);
    const [errors, setErrors] = useState<T>(initialProps);
    const [apiError, setApiError] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const submit = useCallback(() => {
        setIsFetching(true);
        validateUtil
            .validateAuth<T>(schemas, errorsKeys, data)
            .then(() => {
                setErrors(initialProps);
                methodApi
                    .call(ApiQuery.authorization, data)
                    .then(() => {
                        dispatch(UserSliceManager.fetching.getData());
                        dispatch(ProjectSliceManager.fetching.getData());
                        navigate(core.frontendEndpoints.home);
                    })
                    .catch(error => {
                        if (error.status === 401) setApiError(apiErrorPlaceholder);
                        else setApiError('Неизвестная ошибка (');
                    });
            })
            .catch(errors => setErrors(errors[0]))
            .finally(() => {
                setIsFetching(false);
            });
    }, [
        data,
        dispatch,
        errorsKeys,
        initialProps,
        navigate,
        schemas,
        apiErrorPlaceholder,
        methodApi,
    ]);
    return { errors, apiError, submit, data, setData, isFetching, navigate };
}
