import { InputHTMLAttributes } from 'react';

import css from './authInputCss.module.scss';

export default function AuthorizationInput({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className={css.css} />;
}
