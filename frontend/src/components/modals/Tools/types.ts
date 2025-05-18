import { ProjectListAdapted } from '../../../entities/schemas/adaptedSchemas/project';

export interface IToolProps {
    isOpen: boolean;
    coordinates: { x: number; y: number };
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProjectToolProps extends IToolProps {
    project?: ProjectListAdapted;
}
