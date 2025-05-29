import ListToolBase from '../../../../ListToolBase/ListToolBase';
import { IToolProps } from '../types';
import imageLeave from '@assets/imgs/leave.png';
import { useAppDispatch } from '../../../../../../../../hooks/useStore';
import { ProjectSliceManager } from '../../../../../../../../entities/store/featuries/projectSlice';
import { useGetManageProjectModalContext } from '../../../../../hooks/useManageProjectModalContext';

export default function LeaveTool({ projectId, ...props }: IToolProps) {
    const dispatch = useAppDispatch();
    const toolManager = useGetManageProjectModalContext();

    const handleClick = () => {
        dispatch(ProjectSliceManager.fetching.leaveProject(projectId)).then(() =>
            toolManager?.handleClose(),
        );
    };
    return <ListToolBase img={imageLeave} label="Покинуть" {...props} onClick={handleClick} />;
}
