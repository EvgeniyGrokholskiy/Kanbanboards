import {useDispatch} from "react-redux";
import styles from "./description.module.css"
import {Link, useParams} from "react-router-dom";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {ReactComponent as Cross} from "../../assets/images/cross.svg";
import {saveDescriptionToIssueActionCreator} from "../../redux/kanbanReducer";
import {DescriptionProps, IParams, ITask, ParamsObjType} from "../interfases/interfasesAndTypes";


const Description: React.FC<DescriptionProps> = ({state}: DescriptionProps) => {

    const paramsObj: ParamsObjType = useParams<IParams>()
    const dispatch = useDispatch()

    const getParams = (paramsArray: ParamsObjType): string | undefined => {
        return paramsArray["*"]
    }

    const getId = (): string | undefined => {
        const paramsToString = getParams(paramsObj)
        const index = Number(paramsToString?.indexOf('/'))
        return paramsToString?.slice(index + 1).toString()
    }

    const getTasksLogName = (): string => {
        const paramsToString = getParams(paramsObj)
        const index = Number(paramsToString?.indexOf('/'))
        const task: string = paramsToString?.slice(0, index) ? paramsToString?.slice(0, index) : "ready"
        return task ? task : "ready"
    }

    const getDescription = (): Array<ITask> => {
        const id = getId()
        const tasksLogName = getTasksLogName()
        return state[tasksLogName]?.issues.filter((task: ITask) => task.id === id)
    }

    let description: Array<ITask> = getDescription()

    const [editMode, setEditMode]: [editmode: boolean, seEditMode: Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
    const [descriptionValue, setDescriptionValue]: [descriptionValue: string, setDescriptionValue: Dispatch<SetStateAction<string>>] = useState<string>("")

    const editModeToggle = (): void => {
        setEditMode((prev) => !prev)
    }

    const saveDescription = (): void => {
        setEditMode((prev) => !prev)
    }

    useEffect((): void => {
        if (description[0] !== undefined) {

            setDescriptionValue(description[0].description)
        }
    })

    const editFieldRef = useRef<HTMLTextAreaElement>(null)

    useEffect((): void => {
        if (editMode) {
            if (editFieldRef.current !== null) {
                editFieldRef.current.focus()
            }
        }
    }, [editMode]);

    return (
        <div className={styles.container}>
            <div className={styles.description} onDoubleClick={() => {
                saveDescription()
            }}>

                {
                    editMode ?
                        <>
                            <h1 className={styles.header}>{description[0]?.name}</h1>
                            <textarea ref={editFieldRef} className={styles.editField} value={descriptionValue}
                                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                          setDescriptionValue(event.target.value)
                                          const id: string | undefined = getId()
                                          const idToReducer: string = id ? id : "1"
                                          const issueLogName = getTasksLogName()
                                          dispatch(saveDescriptionToIssueActionCreator(idToReducer, issueLogName, event.target.value))
                                      }}/>
                            <button className={styles.editButton} onClick={editModeToggle}>Save</button>
                        </>
                        :
                        <>
                            <Link to={"/"} className={styles.close}>{<Cross/>}</Link>
                            <h1 className={styles.header}>{description[0]?.name}</h1>
                            <p className={styles.text}>{descriptionValue ? descriptionValue : "This task has no description"}</p>
                            <button className={styles.editButton} onClick={editModeToggle}>Edit</button>
                        </>
                }

            </div>
        </div>
    );
}

export default Description;