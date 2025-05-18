import ReactModal from 'react-modal';
import css from './css.module.scss';

export default function ModalBase({ className, ...props }: ReactModal.Props) {
    return (
        <ReactModal
            {...props}
            overlayClassName={props.overlayClassName ?? css.overlay}
            className={`${css.modalContent} ${className}`}
        >
            {props.children}
        </ReactModal>
    );
}
