import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import css from './css.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    img: string;
    label: ReactNode;
}

const ListToolBase = forwardRef<HTMLDivElement, Props>(({ img, label, ...props }: Props, ref) => {
    return (
        <div ref={ref} className={css.wrapper} {...props}>
            <div className={css.wrapperImg}>
                <img src={img} alt="" />
            </div>
            <div className={css.textWrap}>{label}</div>
        </div>
    );
});

ListToolBase.displayName = "ListToolBase"

export default ListToolBase;
