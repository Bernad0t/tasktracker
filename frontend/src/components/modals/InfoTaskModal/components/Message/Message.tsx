import { CommentsDTO } from '../../../../../entities/schemas/dto/commentsDTO';
import { UserDataDTO } from '../../../../../entities/schemas/dto/userDTO';
import PersonBaseAvatar from '../../../../components/AvatarsBase/PersonBaseAvatar/PersonBaseAvatar';
import css from './css.module.scss';

export function MessageBase({
    message,
    className,
    name,
}: {
    message: CommentsDTO;
    className?: string;
    name?: string;
}) {
    const isoDate = new Date(message.date);
    const hours = isoDate.getUTCHours().toString().padStart(2, '0');
    const minutes = isoDate.getUTCMinutes().toString().padStart(2, '0');
    return (
        <div className={`${css.wrapper} ${className}`}>
            {name && <div className={css.name}>{name}</div>}
            <div className={css.text}>{message.description}</div>
            <div className={css.info}>
                {hours}:{minutes}
            </div>
        </div>
    );
}

export function OwnerAccauntMessage({ message }: { message: CommentsDTO }) {
    return (
        <div className={css.mesWrapperOwner}>
            <MessageBase message={message} className={css.owner} />
        </div>
    );
}

export function ForeignAccauntMessage({
    message,
    user,
}: {
    message: CommentsDTO;
    user: UserDataDTO | undefined;
}) {
    return (
        <div className={css.mesWrapper}>
            <PersonBaseAvatar className={css.avatar} />
            <MessageBase message={message} className={css.foreign} name={user?.username} />
        </div>
    );
}
