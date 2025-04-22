import css from "./css.module.scss"
import template_css from "../../../../../assets/MixinCss/classes.module.scss" 

export default function SelectedProject(){
    return(
        <div className={`${css.chat} ${template_css.hide_scroll}`}>
            проект
        </div>
    )
}