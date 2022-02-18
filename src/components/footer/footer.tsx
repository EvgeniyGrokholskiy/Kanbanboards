import React from "react";
import styles from "./footer.module.css"
import {IFooterProps} from "../interfases/interfasesAndTypes";


const Footer: React.FC<IFooterProps> = ({backLog, finished, name, year}: IFooterProps) => {

    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.info}>
                    <p className={styles.text}>{`Active tasks: ${backLog}`}</p>
                    <p className={styles.text}>{`Finished tasks: ${finished}`}</p>
                </div>
                <p className={styles.copyRight}>Kanban board by {name}, {year}</p>
            </div>
        </footer>
    );
};

export default Footer;