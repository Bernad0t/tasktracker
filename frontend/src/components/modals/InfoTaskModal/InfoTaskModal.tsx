import { useEffect, useRef } from 'react';
import { TaskDTORelation } from '../../../entities/schemas/dto/taskDTO';
import { ProjectSliceManager } from '../../../entities/store/featuries/projectSlice';
import { UserSliceManager } from '../../../entities/store/featuries/userSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import BlueScroll from '../../components/stylingString/BlueScroll/BlueScroll';
import ChatInput from '../../UI/inputs/ChatInput/ChatInput';
import ContextDayMessage from './components/ContextDayMessage/ContextDayMessage';
import css from './css.module.scss';
import ModalBase from '../modalBase/modalBase';
import ApiQuery from '../../../api/QueryController';
import { CommentCreateDTO } from '../../../entities/schemas/dto/commentsDTO';

export default function InfoTaskModal({
    task,
    isOpen,
    handleClose,
}: {
    task: TaskDTORelation;
    isOpen: boolean;
    handleClose: () => void;
}) {
    const user = useAppSelector(UserSliceManager.selectors.selectUser);
    const project = useAppSelector(ProjectSliceManager.selectors.selectSelected);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    // Автопрокрутка при изменении сообщений
    useEffect(() => {
        scrollToBottom();
    }, [task.comments]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = (newcomm: CommentCreateDTO) => {
        if (inputRef.current && project) {
            ApiQuery.task.sendComm(newcomm).then(id =>
                dispatch(
                    ProjectSliceManager.redusers.updateSelect({
                        ...project,
                        tasks: project.tasks?.map(projtask =>
                            projtask.id === task.id
                                ? {
                                      ...task,
                                      comments: [...(task.comments ?? []), { ...newcomm, id: id }],
                                  }
                                : projtask,
                        ),
                    }),
                ),
            );
            inputRef.current.value = '';
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputRef.current) {
            const newComm: CommentCreateDTO = {
                description: inputRef.current?.value,
                reviewer: user.id,
                date: new Date(),
                task: task.id,
            };
            handleSend(newComm);
        }
    };

    return (
        <ModalBase isOpen={isOpen} onRequestClose={handleClose} className={css.modal}>
            <div className={css.wrapper}>
                <div className={css.header}>
                    <h3>{task.name}</h3>
                </div>
                <div className={css.panel}>
                    <div className={css.block}>
                        <BlueScroll label={'Описание задачи'} />
                        <div className={css.description}>{task.description}</div>
                        <BlueScroll label={'Исполнители'} />
                        <div className={css.description}>
                            <div>
                                <b>Назначил:</b>{' '}
                                {project?.users?.find(us => us.id === task.reviewer)?.username}
                            </div>
                            <div>
                                <b>Исполнитель:</b>{' '}
                                {project?.users?.find(us => us.id === task.assigned)?.username}
                            </div>
                        </div>
                        <BlueScroll label="Дедлайн" />
                        <div className={css.description}>{task.deadline ?? 'Нет'}</div>
                    </div>
                    <div className={css.chatBlock}>
                        <div className={css.chatWrap}>
                            {project &&
                                task.comments?.map((comm, index) => (
                                    <ContextDayMessage
                                        key={comm.id}
                                        curMes={comm}
                                        prevMes={task.comments && task.comments[index - 1]}
                                        senderIsOwner={comm.reviewer === user.id}
                                        project={project}
                                    />
                                ))}
                            <div ref={messagesEndRef} /> {/* Невидимый якорь для прокрутки */}
                        </div>
                        <ChatInput
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            className={css.inputWrap}
                        />
                    </div>
                </div>
            </div>
        </ModalBase>
    );
}
