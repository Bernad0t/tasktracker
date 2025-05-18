import { HTMLAttributes } from 'react';
import css from './css.module.scss';
import RegistrationSVGcomp from '../../../../components/SVGcomp/registrationSVGcomp/registrationSVGcomp';
import MainPanelTools from '../navigatePanel/MainPanelTools';
import { IPanelTools } from '../../types';

interface Props extends HTMLAttributes<HTMLDivElement> {
    buttons?: IPanelTools[];
}

export default function MainWrapper({ buttons, children, ...props }: Props) {
    return (
        <div className={css.main}>
            <RegistrationSVGcomp />
            <div className={css.wrapper} {...props}>
                {' '}
                {/* по умолчанию все блюрит */}
                <MainPanelTools buttons={buttons ?? []} />
                <div className={css.child}>{children}</div>
            </div>
        </div>
    );
}
