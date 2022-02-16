import React from "react";
import styles from "./tasksblock.module.css";
import AddNewIssue from "./addnewissue/addnewissue";
import {ITask, ITasksBlockProps} from "../interfases/interfasesAndTypes";


const Tasksblock: React.FC<ITasksBlockProps> = ({title, tasks}: ITasksBlockProps) => {

    const issuesToRender = tasks.map((task: ITask) => {
        return <div className={styles.issues}>{task.name}</div>
    })

    const conditionalRender = (title:string) => {
        switch (title) {
            case "Backlog": {
                return <AddNewIssue/>
            }
            case "Ready": {
                const render = tasks.map((task:ITask)=>{
                    return <option value={task.id}>{task.name}</option>
                })
                return <select>{render}</select>
            }
            case "In progress": {
                return <div>{"In progress"}</div>
            }
            case "Finished": {
                return <div>{"Finished"}</div>
            }
        }
    }

    return (
        <div className={styles.block}>
            <h2 className={styles.title}>{title}</h2>
            {issuesToRender}
            <AddNewIssue/>
            {
                conditionalRender(title)
            }
        </div>
    );
}

export default Tasksblock;