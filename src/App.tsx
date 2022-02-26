import "./App.css";
import React, {useEffect} from "react";
import Main from "./components/main/main";
import {Route, Routes} from "react-router";
import {getTasks} from "./redux/selectors";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ErrorPage from "./components/404/errorpage";
import {useDispatch, useSelector} from "react-redux";
import {saveStateActionCreator} from "./redux/kanbanReducer";
import Description from "./components/description/description";
import {IState} from "./components/interfases/interfasesAndTypes";


function App() {

    const state: IState = useSelector(getTasks)
    const dispatch = useDispatch()

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
    }, [])

    useEffect(() => {
        const stateStringify = JSON.stringify(state)
        localStorage.setItem("state", stateStringify)
    }, [state])

    return (
        <div className={"wrapper"}>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/issue/*"} element={<Description state={state}/>}/>
                <Route path={"/*"} element={<ErrorPage/>}/>
            </Routes>
            <Footer backLog={state["backlog"].issues.length} finished={state["finished"].issues.length} name={"Yevgeniy"} year={2022}/>
        </div>
    );
}

export default App;
