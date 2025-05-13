import ProjectPart from "./components/ProjectList/ProjectPanel";
import SelectedProject from "./components/SelectedProject/SelectedProject";
import MainWrapper from "./components/MainWrapper/MainWrapper";
import usePanelButtons from "./hooks/usePanelButtons";

export default function Home(){ // можно в локал сторадж еще сохранять выбраную группу и тип чата
    const buttons = usePanelButtons()
    return(
        <MainWrapper 
            style={{display: "flex", fontSize: "80%"}}
            buttons={buttons.current}
        >
                <ProjectPart/>
                {/* <SelectedProject/> */}
        </MainWrapper>

    )
}