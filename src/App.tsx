import "./App.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Main from "./components/main/main";
import {Route, Routes} from "react-router";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Description from "./components/description/description";
import {getTasks} from "./redux/selectors";
import {IState} from "./components/interfases/interfasesAndTypes";
import {saveStateActionCreator} from "./redux/kanbanReducer";


function App() {

    const [menuState, setMenuState] = useState(false)

    const state: IState = useSelector(getTasks)
    const dispatch = useDispatch()

    const menuHandleClick: () => void = () => {
        setMenuState((prev: boolean) => !prev)
    }

    const getLocalStorageValue = () => {
        const string = localStorage.getItem("state")
        let obj
        if (string) {
            obj = JSON.parse(string)
        }
        return obj
    }

    useEffect(() => {
        let stateObj: IState
        const condition = state.backlog.issues.length === 0 || state.ready.issues.length === 0 || state.inprogress.issues.length === 0 || state.finished.issues.length === 0
        if (condition) {
            stateObj = getLocalStorageValue()
            if (stateObj) {
                dispatch(saveStateActionCreator(stateObj))
            }
        }
    },[])

    useEffect(() => {
        const toString = JSON.stringify(state)
        localStorage.setItem("state", toString)
    }, [state])

    return (
        <div className={"wrapper"}>
            <Header isOpen={menuState} callback={menuHandleClick}/>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/*"} element={<Description state={state}/>}/>
            </Routes>
            <Footer backLog={state["backlog"]} finished={state["finished"]} name={"Yevgeniy"} year={2022}/>
        </div>
    );
}

export default App;
