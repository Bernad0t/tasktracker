import { createContext, useContext } from "react";
import { ProjectListAdapted } from "../../../../../../entities/schemas/adaptedSchemas/project";

export const ProjectContext = createContext<ProjectListAdapted | null>(null)
export const useProjectContext = () => useContext(ProjectContext)