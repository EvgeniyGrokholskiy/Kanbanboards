import React from "react";
import styles from "./main.module.css";
import Tasksblock from "../tasksblock/tasksblock";
import {IMainProps} from "../interfases/interfasesAndTypes";


const Main: React.FC<IMainProps> = ({tasks}:IMainProps) => {

    return (
        <main>
            <div className={styles.wrapper}>
                <Tasksblock tasks={tasks.backlog.issues} title={tasks.backlog.title}/>
                <Tasksblock tasks={tasks.ready.issues} title={tasks.ready.title}/>
                <Tasksblock tasks={tasks.inProgress.issues} title={tasks.inProgress.title}/>
                <Tasksblock tasks={tasks.finished.issues} title={tasks.finished.title}/>
            </div>
        </main>
    );
};

export default Main;