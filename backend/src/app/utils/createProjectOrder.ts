import { ProjectDTO } from "../../schemas/dto/projectDTO";

interface Template<T>{
    parent: T | null,
    child: T | null
}

export default function createProjectOrder<T extends Template<T>>(projects: T[]){
    const orderedProjects: T[] = []
    let current = projects.find(proj => proj.parent == undefined) ?? null
    while (current){
        orderedProjects.push(current)
        current = current.child
    }
    return orderedProjects
}