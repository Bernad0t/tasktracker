import ProjectPart from "./components/ProjectList/ProjectPanel";
import SelectedProject from "./components/SelectedProject/Project";
import MainWrapper from "./components/MainWrapper/MainWrapper";

export default function Home(){ // можно в локал сторадж еще сохранять выбраную группу и тип чата
    return(
        <MainWrapper 
            style={{display: "flex", fontSize: "80%"}}
            buttons={[]}
        >
                <ProjectPart/>
                <SelectedProject/>
        </MainWrapper>

    )
}