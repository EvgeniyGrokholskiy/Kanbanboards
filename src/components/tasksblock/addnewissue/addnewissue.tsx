import React, {useState} from 'react';
import styles from "./addnewissue.module.css";
import {ReactComponent as Plus} from "../../../assets/images/plus.svg";


const AddNewIssue: React.FC = () => {

    const [editMode, setEditMode] = useState(false)
    const [newIssue, setNewIssue] = useState('')

    const editModeOn = () => {
        setEditMode((prev:boolean) => !prev)
    }

    const editModeOff = () => {
        setEditMode((prev:boolean) => !prev)
    }

    return (
        <div className={styles.container}>
            {
                editMode ? <input className={styles.input} value={newIssue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNewIssue(e.currentTarget.value)
                }}/> : null
            }
            {
                editMode ? <button onClick={editModeOff} className={`${styles.submitButton} ${editMode? styles.margin : null}`}>{"Submit"}</button>
                    : <button onClick={editModeOn} className={`${styles.addButton} ${editMode? styles.margin : null}`}><Plus/>{" Add card"}</button>
            }

        </div>
    );
};

export default AddNewIssue;