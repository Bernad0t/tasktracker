import css from "./css.module.scss"
import template_css from "../../../../../../mixins/mixinsCss/classes.module.scss" 

export default function SelectedProject(){
    return(
        <div className={`${css.chat} ${template_css.hide_scroll}`}>
            проект
        </div>
    )
}