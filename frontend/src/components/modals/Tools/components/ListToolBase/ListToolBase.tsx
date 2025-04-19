import { forwardRef, HTMLAttributes, ReactNode } from "react"
import css from "./css.module.scss"

interface Props extends HTMLAttributes<HTMLDivElement>{
    img: ReactNode
    label: ReactNode
}

const ListToolBase = forwardRef<HTMLDivElement, Props>(({img, label, ...props}: Props, ref) => {
    return(
        <div ref={ref} className={css.wrapper} {...props}>
            <div className={css.wrapperImg}>
                {img}
            </div>
            <div className={css.textWrap}>
                {label}
            </div>
        </div>
    )
})

export default ListToolBase