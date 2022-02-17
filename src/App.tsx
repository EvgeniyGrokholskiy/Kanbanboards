import "./App.css";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import Main from "./components/main/main";
import {Route, Routes} from "react-router";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Description from "./components/description/description";
import {getTasks} from "./redux/selectors";



function App() {

    const [appState, setAppState] = useState({
        isOpen: false,
    })
    const state = useSelector(getTasks)

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
                <Routes>
                    <Route path={"/"} element={<Main/>}/>
                    <Route path={"/*"} element={<Description state={state}/>}/>
                </Routes>
                <Footer activeTasks={10} finishedTasks={11} name={"Yevgeniy"} year={2022}/>
            </div>
    );
}

export default App;
