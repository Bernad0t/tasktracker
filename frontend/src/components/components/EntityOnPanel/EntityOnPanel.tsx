import { forwardRef, HTMLAttributes } from 'react';
import css from './css.module.scss';

const EntityOnPanelWrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
    children,
    className,
    ...props
}, ref) => {
    return (
        <div ref={ref} className={`${css.nothoveringEntityOnPanel} ${className}`} {...props}>
            {children}
        </div>
    );
})

export default EntityOnPanelWrapper