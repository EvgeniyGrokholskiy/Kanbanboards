import "./App.css";
import React, {useState} from "react";
import Main from "./components/main/main";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import {state as stateMock} from "./redux/stateMock";


function App() {

    const [state, setState] = useState({
        isOpen: false,
    })

    const menuHandleClick: () => void = () => {
        setState((prevState: { isOpen: boolean }) => {
            return ({
                ...state, isOpen: !prevState.isOpen
            })
        })
    }

    return (
        <div className={"wrapper"}>
            <Header isOpen={state.isOpen} callback={menuHandleClick}/>
            <Main tasks={stateMock}/>
            <Footer activeTasks={10} finishedTasks={11} name={"Yevgeniy"} year={2022}/>
        </div>
    );
}

export default App;
