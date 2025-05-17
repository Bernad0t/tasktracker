import { memo, useMemo } from "react"
import { CommentsDTO } from "../../../../../entities/schemas/dto/commentsDTO"
import { ProjectListAdapted } from "../../../../../entities/schemas/adaptedSchemas/project"
import { ForeignAccauntMessage, OwnerAccauntMessage } from "../Message/Message";
import { formatDateToDMYLocal, isNextDay } from "./utils";

import css from "./css.module.scss"

const ContextDayMessage = memo(function({prevMes, curMes, senderIsOwner, project}: {
    prevMes?: CommentsDTO, curMes: CommentsDTO, senderIsOwner: boolean, project: ProjectListAdapted
}){
    console.log("curMes", curMes)
    const sender = useMemo(() => project.users?.find(us => us.id === curMes.reviewer), [curMes.reviewer, project.users]) // в OwnerAccauntMessage не передается
    return(
        <>
            {prevMes && isNextDay(prevMes.date.toString(), curMes.date.toString()) &&
                <div className={css.day}>
                    <b>{formatDateToDMYLocal(curMes.date.toString())}</b>
                </div>
            }
            {senderIsOwner ? 
                <OwnerAccauntMessage message={curMes}/> : 
                <ForeignAccauntMessage message={curMes} user={sender}/>
            }
        </>
    )
})

export default ContextDayMessage