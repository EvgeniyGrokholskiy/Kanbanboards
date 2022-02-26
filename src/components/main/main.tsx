import React from "react";
import styles from "./main.module.css";
import {useSelector} from "react-redux";
import {getTasks} from "../../redux/selectors";
import TasksBlock from "../tasksblock/tasksBlock";
import {IState} from "../interfases/interfasesAndTypes";


const Main: React.FC = () => {

    const tasks: IState = useSelector(getTasks)
    const {backlog, ready, inprogress: inProgress, finished} = tasks

    return (
        <main>
            <div className={styles.wrapper}>
                <TasksBlock tasks={backlog.issues} title={backlog.title}/>
                <TasksBlock tasks={ready.issues} title={ready.title} prevTasks={backlog}/>
                <TasksBlock tasks={inProgress.issues} title={inProgress.title} prevTasks={ready}/>
                <TasksBlock tasks={finished.issues} title={finished.title} prevTasks={inProgress}/>
            </div>
        </main>
    );
};

export default Main;