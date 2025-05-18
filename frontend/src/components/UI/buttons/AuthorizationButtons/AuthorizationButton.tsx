import { ButtonHTMLAttributes } from 'react';

import css from './authButton.module.scss';

export default function AuthorizationBatton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className={`${css.css} ${props.className}`}>
            {props.children}
        </button>
    );
}
