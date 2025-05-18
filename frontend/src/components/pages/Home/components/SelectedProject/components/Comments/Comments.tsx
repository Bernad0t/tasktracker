import { memo } from 'react';
import { CommentsDTO } from '../../../../../../../entities/schemas/dto/commentsDTO';

const OneComment = memo(function ({ comment }: { comment: CommentsDTO }) {
    return <div></div>;
});

export default function Comments({ comments }: { comments: CommentsDTO[] }) {
    return (
        <div>
            {comments.map(comm => (
                <OneComment comment={comm} />
            ))}
        </div>
    );
}
