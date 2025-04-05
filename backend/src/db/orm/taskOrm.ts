import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import type { ProjectORM, UserORM } from "./userOrm"
import { StatusTask } from "../../schemas/enums/userEnum"

@Entity()
export class TaskORM {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({nullable: true}) // добавь nullable
    description?: string

    @Column({type: "enum", enum: StatusTask, nullable: true}) // nullable будто лучше убрать
    status?: StatusTask

    @Column({nullable: true})
    deadline?: Date

    @ManyToOne("UserORM", (user: UserORM) => user.reviewed_tasks, { cascade: true, onDelete: 'SET NULL' })
    @JoinColumn()
    reviewer?: UserORM

    @ManyToOne("UserORM", (user: UserORM) => user.assigned_tasks, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    assigned!: UserORM

    @ManyToOne("ProjectORM", (project: ProjectORM) => project.tasks, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    project!: ProjectORM

    @OneToMany(() => CommentsORM, (comm) => comm.task)
    comments?: CommentsORM[]

    constructor(init?: Partial<TaskORM>) {
        Object.assign(this, init);
    }
}

@Entity()
export class CommentsORM{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    description!: string
    @Column()
    date!: Date

    @ManyToOne("UserORM", {cascade: true, onDelete: 'CASCADE'}) // я не хочу у юзеров подгружать их комменты
    @JoinColumn()
    reviewer!: UserORM

    @ManyToOne(() => TaskORM, (task) => task.comments, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    task!: TaskORM

    constructor(init?: Partial<CommentsORM>) {
        Object.assign(this, init);
    }
}