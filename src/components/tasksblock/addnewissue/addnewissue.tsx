import React, {useState} from 'react';
import styles from "./addnewissue.module.css";
import {ReactComponent as Plus} from "../../../assets/images/plus.svg";
import {keyDownHandlerType} from "../../interfases/interfasesAndTypes";

interface IAddNewIssueProps {
    editMode: boolean
    editModeOn: () => void
    submit: (newIssue: string) => void
    keyDownHandler: keyDownHandlerType
    selectValue: string
    toNextBoard: (id: string) => void
    select?: JSX.Element
}

const AddNewIssue: React.FC<IAddNewIssueProps> = ({
                                                      editMode,
                                                      editModeOn,
                                                      submit,
                                                      keyDownHandler,
                                                      select,
                                                      selectValue,
                                                      toNextBoard
                                                  }: IAddNewIssueProps) => {

    const [newIssue, setNewIssue] = useState('')

    const handleSubmit = () => {
        if (selectValue) {
            toNextBoard(selectValue)
        } else {
            submit(newIssue)
            setNewIssue('')
        }
    }
    const conditionalRender = () => {
        return select ? select
            : <input className={styles.input} value={newIssue}
                     onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                         keyDownHandler(event, newIssue)
                     }}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setNewIssue(event.currentTarget.value)
                     }}/>
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
                    : <button onClick={editModeOn} className={`${styles.addButton} ${editMode ? styles.margin : null}`}>
                        <Plus/>{" Add card"}</button>
            }
        </div>
    );
};

export default AddNewIssue;