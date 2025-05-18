import ListToolBase from '../../../../ListToolBase/ListToolBase';
import { IToolProps } from '../types';
import image from '../../../../../../../../assets/imgs/profilePassive.png';
import ManageUsersInProject from '../../../../../../ManageUsersInProject/ManageUsersInProject';
import { useCallback, useState } from 'react';
import { useGetManageProjectModalContext } from '../../../../../hooks/useManageProjectModalContext';

export default function AddUSerTool({ projectId, ...props }: IToolProps) {
    const [isOpen, setIsOpen] = useState(false);
    const managerModal = useGetManageProjectModalContext();

    const handleClose = useCallback(() => {
        setIsOpen(false);
        managerModal?.handleClose();
    }, [managerModal]);
    return (
        <>
            <ListToolBase
                img={image}
                label="Участники"
                {...props}
                onClick={() => setIsOpen(true)}
            />
            <ManageUsersInProject projectId={projectId} isOpen={isOpen} handleClose={handleClose} />
        </>
    );
}
