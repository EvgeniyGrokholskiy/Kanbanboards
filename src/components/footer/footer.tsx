import React from "react";
import styles from "./footer.module.css"
import {IFooterProps} from "../interfases/interfasesAndTypes";


const Footer: React.FC<IFooterProps> = ({backLog, finished, name, year}: IFooterProps) => {

    const activeTask = backLog.issues.length
    const finishedTask = finished.issues.length

    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.info}>
                    <p className={styles.text}>{`Active tasks: ${activeTask}`}</p>
                    <p className={styles.text}>{`Finished tasks: ${finishedTask}`}</p>
                </div>
                <p className={styles.copyRight}>Kanban board by {name}, {year}</p>
            </div>
        </footer>
    );
};

export default Footer;