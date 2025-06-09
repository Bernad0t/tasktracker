import ReactModal from 'react-modal';
import css from './css.module.scss';

export default function ModalBase({ className, ...props }: ReactModal.Props) {
    return (
        <ReactModal
            {...props}
            overlayClassName={props.overlayClassName ?? css.overlay}
            className={`${css.modalContent} ${className}`}
        >
            <div className={css.closeWrap}>
                <button className={css.close} onClick={props.onRequestClose}>
                    <b>x</b>
                </button>
            </div>
            {props.children}
        </ReactModal>
    );
}
