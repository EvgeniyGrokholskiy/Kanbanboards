import React from "react";
import Avatar from "./avatar/avatar";
import styles from "./header.module.css"
import {IHeaderProps} from "../interfases/interfasesAndTypes";


const Header: React.FC<IHeaderProps> = ({isOpen , callback}:IHeaderProps) => {

    return (
        <header>
            <div className={styles.header}>
                <h1 className={styles.header__text}>Awesome Kanban Board</h1>
                <Avatar isOpen={isOpen} callback={callback}/>
            </div>
        </header>
    );
}

export default Header;