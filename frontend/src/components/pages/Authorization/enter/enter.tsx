import {initialAuthorizationProp } from '../../../../entities/schemas/dto/authorizationDTO';
import ApiQuery from '../../../../api/QueryController';
import Validators from '../../../../entities/validator/validator';
import core from '../../../../core/core';
import AuthorizationBatton from '../../../UI/buttons/AuthorizationButtons/AuthorizationButton';
import BlueLink from '../../../UI/links/blueLink/BlueLink';
import WayAuthorization from '../components/wayAuthUnderSubmit';
import TypeAuthorization from '../components/TypeAuthorization';
import { InputAuthorizationRow } from '../../../components/AuthorizationRow/AuthorizationRow';
import ErrorMessage from '../../../components/stylingString/errorMessage';
import AuthorizationBaseForm from '../components/AuthorizationBaseForm/Authorization';
import { PlaceholderEnter } from '../types';
import useAuthSubmit from '../../../../hooks/useAuthSybmit';

const schemas = Validators.getEnterValidateSchema()
const errorsKeys = Object.keys(initialAuthorizationProp)
 
export const EnterForm = () => {
 const {
    submit, 
    isFetching, 
    data, 
    setData, 
    errors, 
    apiError, 
    navigate
  } = useAuthSubmit(initialAuthorizationProp, schemas, errorsKeys, ApiQuery.enter, "Неверный логин или пароль")

  return(
    <AuthorizationBaseForm isEnter={true} style={{ minWidth: "300px"}}>
      <TypeAuthorization>Вход</TypeAuthorization>
      {Object.keys(data).map(
        (key) =>
        <InputAuthorizationRow
          key={key} 
          placeholder={PlaceholderEnter[key as keyof typeof PlaceholderEnter]}
          type={key.toLowerCase().indexOf("password") !== -1 ? "password" : "text"}
          keyField={key} 
          value={data[key as keyof typeof data]} 
          onChange={(e) => setData((prev) => ({...prev, [key]: e.target.value}))} 
          error={errors[key as keyof typeof errors]}
        />
      )}
      <div style={{margin: "10px 0px 15px 0px"}}>
        <BlueLink>Забыли пароль?</BlueLink>
      </div>
      <AuthorizationBatton onClick={submit} style={{backgroundColor: isFetching ? "#0055C3" : undefined}} disabled={isFetching}>
        Войти
      </AuthorizationBatton>
      <WayAuthorization nameLink="Зарегистрироваться" nameQuestion="Нет аккаунта?" callback={() => navigate(core.frontendEndpoints.register)}/>
      <div>
        <ErrorMessage>{apiError}</ErrorMessage>
      </div>  
    </AuthorizationBaseForm>
  )
}