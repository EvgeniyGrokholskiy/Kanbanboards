import styles from "./addnewissue.module.css";
import {IAddNewIssueProps} from "../../interfases/interfasesAndTypes";
import {ReactComponent as Plus} from "../../../assets/images/plus.svg";
import React, {Dispatch, ReactNode, SetStateAction, useState} from 'react';


const AddNewIssue: React.FC<IAddNewIssueProps> = ({
                                                      editMode,
                                                      editModeOn,
                                                      submit,
                                                      keyDownHandler,
                                                      select,
                                                      selectValue,
                                                      toNextBoard,
                                                      prevTasks
                                                  }: IAddNewIssueProps) => {

    const [newIssue, setNewIssue]: [newIssue: string, setNewIssue: Dispatch<SetStateAction<string>>] = useState<string>('')

    const handleSubmit = (): void => {
        if (selectValue) {
            toNextBoard(selectValue)
        } else {
            submit(newIssue)
            setNewIssue('')
        }
    }
    const conditionalRender = (): ReactNode => {
        return select ? select
            : <input className={styles.input} value={newIssue}
                     onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                         keyDownHandler(event, newIssue)
                     }}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setNewIssue(event.currentTarget.value)
                     }}/>
    }

    const isDisabled = (): boolean => {
        return prevTasks?.length === 0;
    }

    return (
        <div className={styles.container}>
            {
                editMode ? conditionalRender() : null
            }
            {
                editMode && (newIssue !== "" || selectValue !== "") ?
                    <button onClick={handleSubmit}
                            className={`${styles.submitButton} ${editMode ? styles.margin : null}`}>{"Submit"}</button>
                    : <button onClick={editModeOn} className={`${styles.addButton} ${editMode ? styles.margin : null}`}
                              disabled={isDisabled()}>
                        <Plus/>{" Add card"}</button>
            }
        </div>
    );
};

export default AddNewIssue;