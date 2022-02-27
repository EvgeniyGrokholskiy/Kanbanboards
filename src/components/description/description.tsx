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

    const getDescription = (): ITask => {
        const id = getId()
        const tasksLogName = getTasksLogName()
        const array = state[tasksLogName]?.issues.filter((task: ITask) => task.id === id)
        return array[0]
    }

    let description: ITask = getDescription()

    const [editMode, setEditMode]: [editmode: boolean, seEditMode: Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    const editModeToggle = (): void => {
        setEditMode((prev) => !prev)

        const switchValue = localStorage.getItem("edit")

        switch (switchValue) {
            case "1":
                localStorage.setItem("edit", "0")
                break
            case "0": {
                localStorage.setItem("edit", "1")
                break
            }
            case null:
                localStorage.setItem("edit", "1")
                break

        }
    }

    useEffect((): void => {
        const mode = localStorage.getItem("edit")
        if (mode === "1" && !editMode) {
            setEditMode(true)
        } else if (mode === "0" && editMode){
            setEditMode(false)
        }
    })

    const editFieldRef = useRef<HTMLTextAreaElement>(null)

    useEffect((): void => {
        if (editMode) {
            if (editFieldRef.current !== null) {
                const cursorEndPoint = editFieldRef.current.innerHTML.length
                editFieldRef.current.selectionEnd = cursorEndPoint
                editFieldRef.current.selectionStart = cursorEndPoint
                editFieldRef.current.focus()
            }
        }
    }, [editMode]);

    return (
        <div className={styles.container}>
            <div className={styles.description} onDoubleClick={editModeToggle}>

                {
                    editMode ?
                        <>
                            <h1 className={styles.header}>{description?.name}</h1>
                            <textarea ref={editFieldRef} className={styles.editField} value={description?.description}
                                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
                            <h1 className={styles.header}>{description?.name}</h1>
                            <pre className={styles.text}>{description?.description ? description?.description : "This task has no description"}</pre>
                            <button className={styles.editButton} onClick={editModeToggle}>Edit</button>
                        </>
                }

            </div>
        </div>
    );
}

export default Description;