import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn, Tree, TreeParent, TreeChildren, OneToOne } from "typeorm"
import { Role, TypeProject } from "../../schemas/enums/userEnum"
import type { TaskORM } from "./taskOrm"

@Entity()
export class UserORM {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable: false})
    login!: string

    @Column({nullable: false})
    username!: string

    @Column({ type: "text" })
    password!: string

    @Column({nullable: false})
    email!: string

    @OneToMany(() => UserProjectORM, (userProject) => userProject.project)
    projects?: UserProjectORM[]

    @OneToMany("TaskORM", (task: TaskORM) => task.assigned)
    assigned_tasks?: TaskORM[]

    @OneToMany("TaskORM", (task: TaskORM) => task.reviewer)
    reviewed_tasks?: TaskORM[]
}

@Entity()
export class ProjectORM {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({nullable: true})
    description?: string

    @OneToMany(() => UserProjectORM, (userProject) => userProject.project)
    users!: UserProjectORM[]

    @OneToMany("TaskORM", (task: TaskORM) => task.project)
    tasks?: TaskORM[]
}

@Entity()
export class UserProjectORM {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => UserORM, user => user.projects, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    user!: UserORM;

    @ManyToOne(() => ProjectORM, project => project.users, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    project!: ProjectORM;

    @Column({type: "enum", enum: Role})
    role!: Role;

    @OneToOne(() => UserProjectORM, project => project.child, {cascade: false}) // для приоритетности
    @JoinColumn()
    parent!: UserProjectORM | null

    @OneToOne(() => UserProjectORM, project => project.parent, {cascade: false})
    @JoinColumn()
    child!: UserProjectORM | null
}