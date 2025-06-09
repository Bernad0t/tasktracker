import { useCallback, useEffect, useRef, useState } from 'react';
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
import { UserDataDTO, UserDataRolesDTO } from '../../../entities/schemas/dto/userDTO';
import changeImg from '@assets/imgs/rename.png';
import AutoHeightModal from '../modalBase/AutoHeightModal';
import { OneUser } from '../../components/AddUserPanel/AddUserPanel';
import { ProjectListAdapted } from '../../../entities/schemas/adaptedSchemas/project';

function UsersBar({
    assigned,
    reviewer,
    task,
}: {
    assigned: UserDataRolesDTO | undefined;
    reviewer: UserDataRolesDTO | undefined;
    task: TaskDTORelation;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedProject = useAppSelector(ProjectSliceManager.selectors.selectSelected);
    const dispatch = useAppDispatch();
    const handleClick = useCallback((user: UserDataDTO) => {
        if (selectedProject){
            const newProject: ProjectListAdapted = {
                ...selectedProject,
                tasks: selectedProject?.tasks?.map(tsk => tsk.id === task.id ? {...tsk, assigned: user.id} : tsk),
            };
            ApiQuery.task.updateTask({...task, assigned: user.id})
            .then(() => {
                dispatch(ProjectSliceManager.redusers.updateSelect(newProject))
                setIsOpen(false)
            })
        }
    }, []);
    return (
        <>
            <BlueScroll label={'Исполнители'} />
            <div className={css.description}>
                <div>
                    <b>Назначил:</b>
                    {reviewer?.username}
                </div>
                <div className={css.assigned}>
                    <b>Исполнитель:</b>
                    {assigned?.username}
                    <div>
                        <img src={changeImg} alt="" onClick={() => setIsOpen(true)} />
                    </div>
                </div>
            </div>
            <AutoHeightModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                {selectedProject?.users?.map(us => (
                    <OneUser
                        key={us.id}
                        user={us}
                        onClick={() => handleClick(us)}
                        className={css.wrapperEntityOnPanel}
                    />
                ))}
            </AutoHeightModal>
        </>
    );
}

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
    const [inputValue, setInputValue] = useState('');
    const dispatch = useAppDispatch();

    // Автопрокрутка при изменении сообщений
    useEffect(() => {
        scrollToBottom();
    }, [task.comments]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = (newcomm: CommentCreateDTO) => {
        if (inputValue && project) {
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
            setInputValue('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue) {
            const newComm: CommentCreateDTO = {
                description: inputValue,
                reviewer: user.id,
                date: new Date().toISOString(),
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
                        <UsersBar
                            assigned={project?.users?.find(us => us.id === task.assigned)}
                            reviewer={project?.users?.find(us => us.id === task.reviewer)}
                            task={task}
                        />
                        <BlueScroll label="Дедлайн" />
                        <div className={css.description}>{task.deadline ?? 'Нет'}</div>
                    </div>
                    <div className={css.chatPart}>
                        <span className={css.labelChat}>
                            <h3>Чат</h3>
                        </span>
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
                                value={inputValue}
                                onKeyDown={handleKeyDown}
                                className={css.inputWrap}
                                onChange={e => setInputValue(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ModalBase>
    );
}
