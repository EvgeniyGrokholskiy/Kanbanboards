import React, {useState} from 'react';
import styles from "./addnewissue.module.css";
import {ReactComponent as Plus} from "../../../assets/images/plus.svg";
import {useDispatch} from "react-redux";
import {addIssueActionCreator} from "../../../redux/kanbanReducer";


const AddNewIssue: React.FC = () => {

    const [editMode, setEditMode] = useState(false)
    const [newIssue, setNewIssue] = useState('')
    const dispatch = useDispatch()

    const editModeOn = () => {
        setEditMode((prev:boolean) => !prev)
    }

    const submit = () => {
        setEditMode((prev:boolean) => !prev)
        dispatch(addIssueActionCreator(newIssue))
        setNewIssue('')
    }

    return (
        <div className={styles.container}>
            {
                editMode ? <input className={styles.input} value={newIssue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNewIssue(e.currentTarget.value)
                }}/> : null
            }
            {
                editMode && (newIssue !== "") ? <button onClick={submit} className={`${styles.submitButton} ${editMode? styles.margin : null}`}>{"Submit"}</button>
                    : <button onClick={editModeOn} className={`${styles.addButton} ${editMode? styles.margin : null}`}><Plus/>{" Add card"}</button>
            }

        </div>
    );
};

export default AddNewIssue;