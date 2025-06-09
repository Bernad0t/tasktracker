import ModalBase from './modalBase';
import css from './css.module.scss';

export default function AutoHeightModal({...props}: ReactModal.Props){
    return(
        <ModalBase
            {...props}
            isOpen={props.isOpen}
            overlayClassName={props.overlayClassName ? props.overlayClassName : css.modalOverlay}
            className={props.className ? props.className : css.modalContentAuto}
        >
            {props.children}
        </ModalBase>
    )
}
