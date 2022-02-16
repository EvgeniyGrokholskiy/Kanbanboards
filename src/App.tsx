import "./App.css";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import Main from "./components/main/main";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";



function App() {

    const [appState, setAppState] = useState({
        isOpen: false,
    })

    const menuHandleClick: () => void = () => {
        setAppState((prevState: { isOpen: boolean }) => {
            return ({
                ...appState, isOpen: !prevState.isOpen
            })
        })
    }

    return (
            <div className={"wrapper"}>
                <Header isOpen={appState.isOpen} callback={menuHandleClick}/>
                <Main />
                <Footer activeTasks={10} finishedTasks={11} name={"Yevgeniy"} year={2022}/>
            </div>
    );
}

export default App;
