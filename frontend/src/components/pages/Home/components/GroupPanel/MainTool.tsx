import { memo, ReactNode, useState } from 'react';
import css from './css.module.scss';
import { IPanelTools } from '../../types';
import ImageButtonBase from '../../../../UI/buttons/ImageButtonBase/ImageButtonBase';
import ModalBase from '../../../../modals/modalBase/modalBase';
import leave from "@assets/imgs/leaveBlue.png"
import core from '../../../../../core/core';
import ApiQuery from '../../../../../api/QueryController';
import { useNavigate } from 'react-router-dom';

function OneButton({ children, className }: { children: ReactNode, className?: string}) {
    return <div className={`${css.oneBut} ${className}`}>{children}</div>;
}

const OneButtonMemo = memo(OneButton);

function LogOut(){
    const navigate = useNavigate()
    const logOut = () => {
        ApiQuery.user.logOut()
        .then(() => {
            localStorage.removeItem(core.localStorageKeys.access_token)
            navigate(core.frontendEndpoints.login)
        })
    }
    return(
        <OneButtonMemo className={css.logout}>
            <ImageButtonBase src={leave} onClick={logOut}/>
        </OneButtonMemo >
    )
}

export default function MainTools({ buttons }: { buttons: IPanelTools[] }) {
    const [selectedNode, setSelectedNode] = useState<ReactNode | null>(null);
    return (
        <>
            <div style={{ width: '100%', height: '100%' }}>
                {buttons.map(button => (
                    <OneButtonMemo key={button.name}>
                        {
                            <ImageButtonBase
                                src={button.imgSrc}
                                onClick={() => setSelectedNode(button.node)}
                            />
                        }
                    </OneButtonMemo>
                ))}
                <LogOut/>
            </div>
            <ModalBase isOpen={!!selectedNode} onRequestClose={() => setSelectedNode(null)}>
                {selectedNode}
            </ModalBase>
        </>
    );
}
