import {useDispatch} from "react-redux";
import styles from "./description.module.css"
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {ReactComponent as Cross} from "../../assets/images/cross.svg";
import {saveDescriptionToIssueActionCreator} from "../../redux/kanbanReducer";
import {DescriptionProps, IParams, ITask, ParamsObjType} from "../interfases/interfasesAndTypes";


const Description: React.FC<DescriptionProps> = ({state}: DescriptionProps) => {

    const paramsObj: ParamsObjType = useParams<IParams>()
    const dispatch = useDispatch()

    const getParams = (paramsArray: ParamsObjType) => {
        return paramsArray["*"]
    }

    const getId = () => {
        const paramsToString = getParams(paramsObj)
        const index = Number(paramsToString?.indexOf('/'))
        return paramsToString?.slice(index + 1).toString()
    }

    const getTasksLogName = () => {
        const paramsToString = getParams(paramsObj)
        const index = Number(paramsToString?.indexOf('/'))
        const task: string = paramsToString?.slice(0, index) ? paramsToString?.slice(0, index) : "ready"
        return task ? task : "ready"
    }

    const getDescription = () => {
        const id = getId()
        const tasksLogName = getTasksLogName()
        return state[tasksLogName]?.issues.filter((task: ITask) => task.id === id)
    }

    const description = getDescription()

    const [editMode, setEditMode] = useState(false)
    const [descriptionValue, setDescriptionValue] = useState("")

    const editModeOn = () => {
        setEditMode((prev) => !prev)
    }

    const saveDescription = () => {
        const id:string|undefined = getId()
        const idToReducer:string = id? id : "1"
        const issueLogName = getTasksLogName()
        dispatch(saveDescriptionToIssueActionCreator(idToReducer,issueLogName, descriptionValue))
        setEditMode((prev) => !prev)
    }

    useEffect(() => {
        if (description[0].description !== descriptionValue) {
            setDescriptionValue(description[0].description)
        }
    }, [])

    const editFieldRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (editMode) {
            if (editFieldRef.current !== null) {
                editFieldRef.current.focus()
            }
        }
    }, [editMode]);

    return (
        <div className={styles.container}>
            <div className={styles.description} onDoubleClick={() => {
                setEditMode((prev) => !prev)
            }}>

                {
                    editMode ?
                        <>
                            <h1 className={styles.header}>{description[0].name}</h1>
                            <textarea ref={editFieldRef} className={styles.editField} value={descriptionValue}
                                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                          setDescriptionValue(event.target.value)
                                      }}/>
                            <button className={styles.editButton} onClick={saveDescription}>Save</button>
                        </>
                        :
                        <>
                            <Link to={"/"} className={styles.close}>{<Cross/>}</Link>
                            <h1 className={styles.header}>{description[0].name}</h1>
                            <p className={styles.text}>{descriptionValue ? descriptionValue : "This task has no description"}</p>
                            <button className={styles.editButton} onClick={editModeOn}>Edit</button>
                        </>
                }

            </div>
        </div>
    );
}

export default Description;