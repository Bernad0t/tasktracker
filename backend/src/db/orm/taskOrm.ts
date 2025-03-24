import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import type { ProjectORM, UserORM } from "./userOrm"
import { StatusTask } from "../../schemas/enums/userEnum"

@Entity()
export class TaskORM {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description?: string

    @Column({type: "enum", enum: StatusTask, nullable: true})
    status?: StatusTask

    @Column({nullable: true})
    deadline?: Date

    @Column()
    priority!: number

    @ManyToOne("UserORM", (user: UserORM) => user.reviewed_tasks, { cascade: true, onDelete: 'SET NULL' })
    @JoinColumn()
    reviewer_id?: UserORM

    @ManyToOne("UserORM", (user: UserORM) => user.assigned_tasks, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    assigned_id!: UserORM

    @ManyToOne("ProjectORM", (project: ProjectORM) => project.tasks, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    project!: ProjectORM

    @OneToMany(() => CommentsORM, (comm) => comm.task)
    comments?: CommentsORM[]
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
}