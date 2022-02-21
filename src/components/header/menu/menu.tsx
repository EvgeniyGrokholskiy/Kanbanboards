import React from "react";
import styles from "./menu.module.css";


const Menu:React.FC = () => {

    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                <li className={styles.item}>Profile</li>
                <li className={styles.item}>Log Out</li>
            </ul>
        </div>
    );
};

export default Menu;