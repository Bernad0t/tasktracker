import { SelectHTMLAttributes } from "react";
import css from "./css.module.scss"

export default function BlueSelect({...props}: SelectHTMLAttributes<HTMLSelectElement>){
    return (
        <select className={css.css} {...props}>{props.children}</select>
    )
}