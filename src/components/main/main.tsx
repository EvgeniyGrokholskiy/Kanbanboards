import React from "react";
import styles from "./main.module.css";
import {useSelector} from "react-redux";
import {getTasks} from "../../redux/selectors";
import TasksBlock from "../tasksblock/tasksBlock";
import { IState } from "../interfases/interfasesAndTypes";


const Main: React.FC = () => {

    const tasks: IState = useSelector(getTasks)
    const {backlog, ready, inProgress, finished} = tasks

    return (
        <main>
            <div className={styles.wrapper}>
                <TasksBlock tasks={backlog.issues} title={backlog.title}/>
                <TasksBlock tasks={ready.issues} title={ready.title} prevTasks={backlog.issues}/>
                <TasksBlock tasks={inProgress.issues} title={inProgress.title} prevTasks={ready.issues}/>
                <TasksBlock tasks={finished.issues} title={finished.title} prevTasks={inProgress.issues}/>
            </div>
        </main>
    );
};

export default Main;