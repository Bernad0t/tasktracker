import ModalBase from './modalBase';
import css from './css.module.scss';

export default function ThinModal({ ...props }: ReactModal.Props) {
    return (
        <ModalBase
            {...props}
            overlayClassName={props.overlayClassName ?? css.overlay}
            className={css.thinModal}
        >
            {props.children}
        </ModalBase>
    );
}
