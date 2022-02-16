import React from "react";
import styles from "./footer.module.css"
import {IFooterProps} from "../interfases/interfasesAndTypes";


const Footer: React.FC<IFooterProps> = ({activeTasks, finishedTasks, name, year}: IFooterProps) => {

    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.info}>
                    <p className={styles.text}>{`Active tasks: ${activeTasks}`}</p>
                    <p className={styles.text}>{`Finished tasks: ${finishedTasks}`}</p>
                </div>
                <p className={styles.copyRight}>Kanban board by {name}, {year}</p>
            </div>
        </footer>
    );
};

export default Footer;