import { ProjectDTO } from "../../schemas/dto/projectDTO";

export default function createProjectOrder(projects: ProjectDTO[]){
    const orderedProjects: ProjectDTO[] = []
    let current = projects.find(proj => proj.parent == undefined)
    while (current){
        orderedProjects.push(current)
        current = current.child
    }
    return orderedProjects
}