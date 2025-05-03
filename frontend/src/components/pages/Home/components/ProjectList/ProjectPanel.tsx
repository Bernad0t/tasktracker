import scss_union from "../../../../../assets/MixinCss/classes.module.scss"
import SearchInput from "../../../../UI/inputs/SearchInput/SearchInput"
import css from "./css.module.scss"
import ProjectList from "./ProjectList/ProjectList"

export default function ProjectPart(){
    return(
        <div className={css.wrap}>
            <div className={`${scss_union.hide_scroll} ${css.typeChat}`}>
                <b><i>Tasktracker</i></b>
            </div>
            <div className={css.input_wrap}>
                <SearchInput/>
            </div>
            <ProjectList/>
        </div>
    )
}