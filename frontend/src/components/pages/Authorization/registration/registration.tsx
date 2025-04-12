import { initialRegisrationProp } from "../../../../entities/schemas/dto/authorizationDTO"
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
import LoadingComponent from "../../../components/loadingComponent"
import RegistrationSVGcomp from "../../../components/SVGcomp/registrationSVGcomp/registrationSVGcomp"
import useAuthSubmit from "../../../../hooks/useAuthSybmit"

const schemas = Validators.getRegisterValidateSchema()
const errorsKeys = Object.keys(initialRegisrationProp)

export default function Registration(){
    const {
        submit, 
        isFetching, 
        data, 
        setData, 
        errors, 
        apiError, 
        navigate
    } = useAuthSubmit(initialRegisrationProp, schemas, errorsKeys, ApiQuery.register, "Такой пользователь существует")

    return(
        <>
        <RegistrationSVGcomp/>
        <AuthorizationBaseForm isEnter={false}>
            <TypeAuthorization>Регистрация</TypeAuthorization>
            <LoadingComponent loading={isFetching}>
                {Object.keys(data).map(
                    (key) =>
                    <InputAuthorizationRow
                        key={key} 
                        label={LabelRegistration[key as keyof typeof LabelRegistration]}
                        type={key.toLowerCase().indexOf("password") !== -1 ? "password" : "text"}
                        keyField={key} 
                        placeholder={PlaceholderRegistration[key as keyof typeof PlaceholderRegistration]}
                        value={data[key as keyof typeof data]} 
                        onChange={(e) => setData((prev) => ({...prev, [key]: e.target.value}))} 
                        error={errors[key as keyof typeof errors]}
                    />
                )}
                <AuthorizationBatton 
                    onClick={submit} 
                    style={{marginTop: "20px", backgroundColor: isFetching ? "#0055C3" : undefined}} 
                    disabled={isFetching}
                >
                        Зарегистрироваться
                </AuthorizationBatton>
                <WayAuthorization nameLink="Войти" nameQuestion="Есть аккаунт?" callback={() => navigate(core.frontendEndpoints.login)}/>
                <div>
                    <ErrorMessage>{apiError}</ErrorMessage>
                </div>
            </LoadingComponent>
        </AuthorizationBaseForm>
        </>
    )
}