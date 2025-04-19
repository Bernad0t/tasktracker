import { ProjectDTO } from "../../../entities/schemas/dto/projectDTO"

export interface IToolProps{
    isOpen: boolean
    coordinates: {x: number, y: number}
    setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

export interface ProjectToolProps extends IToolProps{
    project?: ProjectDTO
}