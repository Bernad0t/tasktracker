import { SelectHTMLAttributes } from "react";

export default function BlueSelect({...props}: SelectHTMLAttributes<HTMLSelectElement>){
    return (
        <select name="" id="" {...props}>{props.children}</select>
    )
}