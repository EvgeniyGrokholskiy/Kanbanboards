import React from "react";
import styles from "./description.module.css"
import {useParams} from "react-router-dom";
import {IState} from "../interfases/interfasesAndTypes";

interface DescriptionProps {
    state: IState
}

const Description: React.FC<DescriptionProps> = ({state}:DescriptionProps) => {

    const params = useParams()
    const paramsToString = params["*"]
    const index = Number(paramsToString?.indexOf('/'))
    const id = paramsToString?.slice(index + 1)
    const task:string = paramsToString?.slice(0, index) ? paramsToString?.slice(0, index) : "ready"
    const tasksSection:string = task ? task : "ready"
    //const description = state[tasksSection]
    console.log(id, task)
    return (
        <div className={styles.container}>
            <div className={styles.description}>

            </div>
        </div>
    );
}

export default Description;