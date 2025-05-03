import { initialRegisrationProp, RegisrationProp } from "../../../../entities/schemas/dto/authorizationDTO"
import Validators from "../../../../entities/validator/validator"
import ErrorMessage from "../../../components/stylingString/errorMessage"
import AuthorizationBatton from "../../../UI/buttons/AuthorizationButtons/AuthorizationButton"
import WayAuthorization from "../components/wayAuthUnderSubmit"
import ApiQuery from "../../../../api/QueryController"
import core from "../../../../core/core"
import AuthorizationBaseForm from "../components/AuthorizationBaseForm/Authorization"
import TypeAuthorization from "../components/TypeAuthorization"
import { InputAuthorizationRow } from "../../../components/AuthorizationRow/AuthorizationRow"
import { LabelRegistration, PlaceholderRegistration } from "../types"
import LoadingComponent from "../../../components/LoadingComponent"
import RegistrationSVGcomp from "../../../components/SVGcomp/registrationSVGcomp/registrationSVGcomp"
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { UserSliceManager } from "../../../../entities/store/featuries/userSlice"
import { ProjectSliceManager } from "../../../../entities/store/featuries/projectSlice"
import { useAppDispatch } from "../../../../hooks/useStore"

const schemas = Validators.getRegisterValidateSchema()

export default function Registration(){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisrationProp>({
        defaultValues: initialRegisrationProp,
        resolver: yupResolver(schemas[0])
    })
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState("")
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<RegisrationProp> = (data: RegisrationProp) => {
        setIsLoading(true)
        ApiQuery.authorization.register(data)
        .then(() => {
            dispatch(UserSliceManager.fetching.getData())
            dispatch(ProjectSliceManager.fetching.getData())
            navigate(core.frontendEndpoints.home)
        })
        .catch((error) => {
            if (error.status === 401)
                setApiError("Пользователь с такими login или email существует")
            else setApiError("Неизвестная ошибка (")
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return(
        <>
        <RegistrationSVGcomp/>
        <AuthorizationBaseForm isEnter={false}>
            <TypeAuthorization>Регистрация</TypeAuthorization>
            <form onSubmit={handleSubmit(onSubmit)}>
                <LoadingComponent loading={isLoading}>
                    {Object.keys(initialRegisrationProp).map(
                        (key) =>
                        <InputAuthorizationRow
                            {...register(key as keyof typeof initialRegisrationProp)}
                            key={key} 
                            label={LabelRegistration[key as keyof typeof LabelRegistration]}
                            type={key.toLowerCase().indexOf("password") !== -1 ? "password" : "text"}
                            keyField={key} 
                            placeholder={PlaceholderRegistration[key as keyof typeof PlaceholderRegistration]}
                            error={errors[key as keyof typeof errors]?.message}
                        />
                    )}
                    <AuthorizationBatton 
                        type="submit"
                        style={{marginTop: "20px", backgroundColor: isLoading ? "#0055C3" : undefined}} 
                        disabled={isLoading}
                    >
                            Зарегистрироваться
                    </AuthorizationBatton>
                    <WayAuthorization nameLink="Войти" nameQuestion="Есть аккаунт?" callback={() => navigate(core.frontendEndpoints.login)}/>
                    <div>
                        <ErrorMessage>{apiError}</ErrorMessage>
                    </div>
                </LoadingComponent>
            </form>
        </AuthorizationBaseForm>
        </>
    )
}