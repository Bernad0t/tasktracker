// import { HTMLAttributes, useRef, useState } from "react";
// import ListToolBase from "../../../../../ListToolBase/ListToolBase";
// import css from "../../../../css.module.scss"
// import imageFolder from "../../../../../../../../../../assets/img/folder.png"
// import PersonBar from "./PersonBar";
// import PersonBaseAvatar from "../../../../../../../../components/AvatarsBase/PersonBaseAvatar/PersonBaseAvatar";

// function Label(){
//     return(
//         <div className={css.labelWithMenu}>
//             <div>
//                 Назначить задачу
//             </div>
//         </div>
//     )
// }

// export function ChatGroupTool({...props}: HTMLAttributes<HTMLDivElement>){
//     const [isOpen, setIsOpen] = useState<boolean>(false);
//     const ref = useRef<HTMLDivElement>(null)

//     const handleMouseEnter = () => {
//         setIsOpen(true); // Показываем панель
//     };

//     const handleMouseLeave = () => {
//         setIsOpen(false); // Скрываем панель
//     };

//     return(
//         <>
//             <ListToolBase
//                 ref={ref}
//                 img={<PersonBaseAvatar/>} 
//                 label={<Label/>} 
//                 {...props}
//                 onMouseLeave={handleMouseLeave}
//                 onMouseEnter={handleMouseEnter}
//             /> 
//             {
//                 isOpen && 
//                 <PersonBar
//                     refLeftEl={ref}
//                     isOpen={isOpen}
//                     onMouseLeave={handleMouseLeave}
//                     onMouseEnter={handleMouseEnter}
//                 />
//             }
//         </>
//     )
// }