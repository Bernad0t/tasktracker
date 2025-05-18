import * as Yup from 'yup';
import { AuthorizationProp } from '../entities/schemas/dto/authorizationDTO';
import createErrorObjFromValidationError from '../entities/validator/validateSchemas/createErrorObjFromValidationError';

class ValidateUtil {
    async validateAuth<T extends AuthorizationProp>(
        schemas: Yup.ObjectSchema<T>[],
        errorsKeys: string[],
        data: T,
    ) {
        /* 
            вход: schemas - массив схем, по которым проитеруемся и проверим каждую (если хоть в одной нет ошибки - валидация пройдена)
            errorsKeys - ключи, которым будут соответствовать ошибки (должны совпадать с полями объекта. цель - вернуть ошибки по нужным полям)
            data - валидируемый объект
        */
        let newErrors: T[] = [];
        for (const schema of schemas) {
            try {
                await schema.validate(data, { abortEarly: false });
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const newError = createErrorObjFromValidationError<T>(errorsKeys, error.inner);
                    if (newError) newErrors = [...newErrors, newError];
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        }
        if (newErrors.length === schemas.length) throw newErrors;
    }
}

const validateUtil = new ValidateUtil();
export default validateUtil;
