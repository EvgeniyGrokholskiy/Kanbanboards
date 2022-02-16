import React from "react";
import styles from "./main.module.css";
import Tasksblock from "../tasksblock/tasksblock";
import {getTasks} from "../../redux/selectors";
import {useSelector} from "react-redux";
import {IState} from "../../redux/kanbanReducer";


const Main: React.FC = () => {

    const tasks:IState = useSelector(getTasks)

    return (
        <main>
            <div className={styles.wrapper}>
                <Tasksblock tasks={tasks.backlog.issues} title={tasks.backlog.title} />
                <Tasksblock tasks={tasks.ready.issues} title={tasks.ready.title} />
                <Tasksblock tasks={tasks.inProgress.issues} title={tasks.inProgress.title} />
                <Tasksblock tasks={tasks.finished.issues} title={tasks.finished.title} />
            </div>
        </main>
    );
};

export default Main;