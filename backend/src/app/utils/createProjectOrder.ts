import { ProjectDTO } from "../../schemas/dto/projectDTO";

interface Template<T>{
    id: number
    parent: T | null,
    child: T | null
}

export default function createProjectOrder<T extends Template<T>>(projects: T[]){
    const orderedProjects: T[] = []
    let current = projects.find(proj => proj.parent == undefined) ?? null
    while (current){
        console.log("current", current)
        orderedProjects.push(current)
        current = projects.find(proj => proj.id === current?.child?.id) ?? null // relations не подгружают бесконечно вглубь чилдренов, придетса так
    }
    return orderedProjects
}