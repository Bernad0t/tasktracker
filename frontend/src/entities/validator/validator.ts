import * as Yup from 'yup';
import {
    EmailValidationSchema,
    LoginValidationSchema,
    PasswordValidateSchema,
} from './validateSchemas/authorizationSchemas';

export default class Validators {
    static getEnterValidateSchema() {
        const logValidate = Yup.object().shape({
            login: LoginValidationSchema.test('invalid-email', 'Некорректная почта', value => {
                // Проверка на пустое значение
                if (!value) return true;
                // Если в строке есть символ '@', но это не валидный email — ошибка
                return !value.includes('@') || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value ?? '');
            })
                .min(2, 'Минимум 2 символа')
                .max(50, 'Максимум 50 символов')
                .required('Пустое поле'),
            password: PasswordValidateSchema,
        });
        const emailValidate = Yup.object().shape({
            login: EmailValidationSchema,
            password: PasswordValidateSchema,
        });
        return [logValidate, emailValidate];
    }

    static getRegisterValidateSchema() {
        return [
            Yup.object().shape({
                login: LoginValidationSchema.matches(
                    /^(?!\d+$)(?!.*@).*$/,
                    'Логин не содержит @ и не может быть численным',
                ),
                password: PasswordValidateSchema,
                email: EmailValidationSchema,
                repeatPassword: Yup.string()
                    .oneOf([Yup.ref('password'), undefined], 'Пароли должны совпадать')
                    .required('Пустое поле'),
                username: Yup.string().required('Пустое поле'),
            }),
        ];
    }
}
