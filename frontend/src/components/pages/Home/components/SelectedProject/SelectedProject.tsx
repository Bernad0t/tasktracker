import useSortedTasks from './hooks/useSortedTasks';
import TaskTypeWrapper from './components/TaskTypeWrapper/TaskTypeWrapper';
import { useAppSelector } from '../../../../../hooks/useStore';
import { ProjectSliceManager } from '../../../../../entities/store/featuries/projectSlice';
import css from './css.module.scss';
import PanelProject from './components/Panel/Panel';

export default function SelectedProject() {
    const project = useAppSelector(ProjectSliceManager.selectors.selectSelected);
    const dictTasks = useSortedTasks(project?.tasks ?? []);
    return (
        <>
            {project && (
                <div className={css.wrapper}>
                    <PanelProject project={project} />
                    <div className={css.tasks}>
                        {Array.from(dictTasks?.keys() ?? []).map(key => (
                            <TaskTypeWrapper
                                key={key}
                                statusName={key}
                                tasks={dictTasks?.get(key) ?? []}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
