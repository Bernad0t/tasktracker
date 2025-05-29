import { memo, useRef, useState } from 'react';
import { TaskDTORelation } from '../../../../../../../entities/schemas/dto/taskDTO';
import css from './css.module.scss';
import EntityOnPanelWrapper from '../../../../../../components/EntityOnPanel/EntityOnPanel';
import { useAppSelector } from '../../../../../../../hooks/useStore';
import { UserSliceManager } from '../../../../../../../entities/store/featuries/userSlice';
import ProjectBaseAvatar from '../../../../../../components/AvatarsBase/ProjectAvatarBase/ProjectBaseAvatar';
import TextInfo from '../../../../../../components/TextInfo/TextInfo';
import InfoTaskModal from '../../../../../../modals/InfoTaskModal/InfoTaskModal';
import { useDrag, useDrop } from 'react-dnd';
import { DraggingTypes } from '../../../../../../../entities/schemas/enums/dragging';
import useHandleDrop from './hooks/useHandleDrop';
import { StatusTask } from '../../../../../../../entities/schemas/enums/project';

const OneTask = memo(function ({ task }: { task: TaskDTORelation }) {
    const user = useAppSelector(UserSliceManager.selectors.selectUser);
    const [isOpen, setIsOpen] = useState<boolean>(false); // для подробного описания таски
    const [{ isDragging }, drag] = useDrag(() => ({
        type: DraggingTypes.task,
        item: { task },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
            clientOffset: monitor.getClientOffset(),
        }),
    }));
    return (
        // при клике открой модальное окно, где будет вся инфа + коммы
        <>
            <div
                className={`${css.oneTask} ${task.assigned === user.id ? css.assigned : ''} ${isDragging ? css.dragOneTask : ''}`}
                onClick={() => setIsOpen(true)}
                ref={drag as unknown as React.Ref<HTMLDivElement>}
            >
                <EntityOnPanelWrapper className={css.wrapEntity}>
                    <div className={css.avatar}>
                        <ProjectBaseAvatar />
                    </div>
                    <TextInfo title={task.name} />
                </EntityOnPanelWrapper>
                <div className={css.date}>
                    <b>ДД: {task.deadline ? String(task.deadline) : 'Нет'}</b>
                </div>
            </div>
            <InfoTaskModal isOpen={isOpen} task={task} handleClose={() => setIsOpen(false)} />
        </>
    );
});

OneTask.displayName = "OneTask"

export default function TaskTypeWrapper({
    tasks,
    statusName,
}: {
    tasks: TaskDTORelation[];
    statusName: keyof typeof StatusTask;
}) {
    const divRef = useRef<HTMLDivElement>(null); // Создаём ref для DOM-элемента
    const hadleDrop = useHandleDrop(StatusTask[statusName], divRef);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: DraggingTypes.task,
        drop: (item: { task: TaskDTORelation }, monitor) => {
            const dropPosition = monitor.getClientOffset();
            dropPosition && hadleDrop(item.task, dropPosition);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    const setRefs = (node: HTMLDivElement | null) => {
        divRef.current = node;
        drop(node); 
    };
    return (
        <div ref={setRefs} className={`${css.wrapper} ${isOver ? css.wrapDroping : ''}`}>
            <div className={css.label}>
                <h3>{statusName ? statusName : 'Не назначены'}</h3>
            </div>
            <div className={`${css.wrapTasks}`}>
                {tasks.map(task => (
                    <OneTask key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}
