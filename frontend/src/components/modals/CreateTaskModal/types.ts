import { SubmitHandler } from 'react-hook-form';
import { ProjectDTORelation } from '../../../entities/schemas/dto/projectDTO';
import { TaskDTO } from '../../../entities/schemas/dto/taskDTO';

export interface ICreateTaskProps {
    project: ProjectDTORelation;
    isOpen: boolean;
    handleClose: () => void;
    onSubmit: SubmitHandler<TaskDTO>;
    existingTask?: TaskDTO;
}

export enum LabelCreatePropsEnum {
    name = 'Название *', // * указывает на обязательность
    description = 'Описание',
}
