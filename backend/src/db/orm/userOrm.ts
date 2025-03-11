import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { Role, TypeProject } from "../../schemas/enums/userEnum"
import { TaskORM } from "./taskOrm"

@Entity()
export class UserORM {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    login!: string

    @Column()
    username!: string

    @Column()
    password!: string

    @Column()
    email!: string

    @OneToMany(() => UserProjectORM, (userProject) => userProject.project)
    projects?: UserProjectORM[]

    @OneToMany(() => TaskORM, (task) => task.assigned_id)
    assigned_tasks?: TaskORM[]

    @OneToMany(() => TaskORM, (task) => task.reviewer_id)
    reviewed_tasks?: TaskORM[]
}

@Entity()
export class ProjectORM {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description?: string

    @Column()
    type!: TypeProject

    @OneToMany(() => UserProjectORM, (userProject) => userProject.user)
    users!: UserProjectORM[]

    @OneToMany(() => TaskORM, (task) => task.project)
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

    @Column()
    role!: Role;

    @Column()
    priority!: number; // отображает порядок, в котором проекты сортируются. пусть будет по убыванию 
}