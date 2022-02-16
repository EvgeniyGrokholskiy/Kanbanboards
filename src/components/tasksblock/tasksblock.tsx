import React from "react";
import styles from "./tasksblock.module.css";
import AddNewIssue from "./addnewissue/addnewissue";
import {ITask, ITasksBlockProps} from "../interfases/interfasesAndTypes";


const Tasksblock: React.FC<ITasksBlockProps> = ({title, tasks}: ITasksBlockProps) => {

    const issuesToRender = tasks.map((task: ITask) => {
        return <div className={styles.issues}>{task.name}</div>
    })

    return (
        <div className={styles.block}>
            <h2 className={styles.title}>{title}</h2>
            {issuesToRender}
            <AddNewIssue/>
        </div>
    );
}

export default Tasksblock;