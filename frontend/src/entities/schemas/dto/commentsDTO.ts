export interface CommentCreateDTO {
    description: string;
    date: Date;
    reviewer: number;
    task: number;
}

export interface CommentsDTO extends CommentCreateDTO {
    id: number;
}
