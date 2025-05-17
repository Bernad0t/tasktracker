import css from "./css.module.scss"

export default function TextInfo({title, description}: {title: string, description?: string}){
    return(
        <div className={css.wrapperText}>
            <div>
                <b>{title}</b>
            </div>
            <div className={css.lastMes}>
                {description}
            </div>
        </div>
    )
}