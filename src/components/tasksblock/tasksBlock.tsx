import React, {useState} from "react";
import {useDispatch} from "react-redux";
import styles from "./tasksblock.module.css";
import AddNewIssue from "./addnewissue/addnewissue";
import {ITask, ITasksBlockProps, keyDownHandlerType} from "../interfases/interfasesAndTypes";
import {
    addIssueActionCreator,
    moveIssueToFinishActionCreator,
    moveIssueToInProcessActionCreator,
    moveIssueToReadyActionCreator
} from "../../redux/kanbanReducer";
import {Link} from "react-router-dom";


const TasksBlock: React.FC<ITasksBlockProps> = ({title, tasks, prevTasks = []}: ITasksBlockProps) => {

    const [editMode, setEditMode] = useState(false)
    const [selectValue, setSelectValue] = useState("")
    const dispatch = useDispatch()

    const editModeOn = () => {
        setEditMode((prev: boolean) => !prev)
    }

    const submit = (newIssue: string) => {
        setEditMode((prev: boolean) => !prev)
        dispatch(addIssueActionCreator(newIssue))
    }

    const toNextBoard = (id: string) => {

        if (title === "Ready") {
            dispatch(moveIssueToReadyActionCreator(id))
        } else if (title === "In progress") {
            dispatch(moveIssueToInProcessActionCreator(id))
        } else if (title === "Finished") {
            dispatch(moveIssueToFinishActionCreator(id))
        }

        setSelectValue("")
        setEditMode((prev: boolean) => !prev)
    }

    const keyDownHandler: keyDownHandlerType = (event: React.KeyboardEvent<HTMLInputElement>, newIssue: string) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            submit(newIssue)
        }
    }

    const issuesToRender = tasks.map((task: ITask) => {
        const newTitle = title === "In progress" ? "inProgress" : title
        const path = (`/issue/${newTitle}/${task.id}`).toLowerCase()
        return <Link key={task.id} to={path} className={styles.issues}>{task.name}</Link>
    })

    const selectRender = (tasks: Array<ITask>) => {

        const option = tasks.map((task: ITask) => {
            return <option key={task.id} value={task.id}>{task.name}</option>
        })

        return <select value={selectValue}
                       onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => setSelectValue(event.target.value)}>
            <option>Select issue...</option>
            {option}</select>
    }

    const conditionalRender = (title: string) => {

        switch (title) {
            case "Backlog": {
                return <AddNewIssue editMode={editMode} editModeOn={editModeOn}
                                    keyDownHandler={keyDownHandler}
                                    submit={submit} selectValue={selectValue} toNextBoard={toNextBoard}/>
            }
            case "Ready": {
                return <AddNewIssue prevTasks={prevTasks} editMode={editMode} editModeOn={editModeOn}
                                    keyDownHandler={keyDownHandler}
                                    submit={submit} select={selectRender(prevTasks)} selectValue={selectValue}
                                    toNextBoard={toNextBoard}/>
            }
            case "In progress": {
                return <AddNewIssue prevTasks={prevTasks} editMode={editMode} editModeOn={editModeOn}
                                    keyDownHandler={keyDownHandler}
                                    submit={submit} select={selectRender(prevTasks)} selectValue={selectValue}
                                    toNextBoard={toNextBoard}/>
            }
            case "Finished": {
                return <AddNewIssue prevTasks={prevTasks} editMode={editMode} editModeOn={editModeOn}
                                    keyDownHandler={keyDownHandler}
                                    submit={submit} select={selectRender(prevTasks)} selectValue={selectValue}
                                    toNextBoard={toNextBoard}/>
            }
        }
    }

    return (
        <div className={styles.block}>
            <h2 className={styles.title}>{title}</h2>
            {issuesToRender}
            {
                conditionalRender(title)
            }
        </div>
    );
}

export default TasksBlock