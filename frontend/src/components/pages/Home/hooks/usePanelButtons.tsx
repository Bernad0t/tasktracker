import { IPanelTools } from '../types';
import addImg from '@assets/imgs/add.png';
import ProjectForm from '../../../modals/ProjectForm/ProjectForm';
import { useRef } from 'react';
import { TypeManipulateWihProjectForm } from '../../../modals/ProjectForm/types';

const usePanelButtons = () => {
    const buttons = useRef<IPanelTools[]>([
        {
            name: 'Добавить проект',
            imgSrc: addImg,
            node: <ProjectForm whatIs={TypeManipulateWihProjectForm.add} />,
        },
    ]);

    return buttons;
};

export default usePanelButtons;
