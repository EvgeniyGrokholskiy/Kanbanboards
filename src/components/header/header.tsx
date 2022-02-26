import React, {useState} from "react";
import Avatar from "./avatar/avatar";
import styles from "./header.module.css"


const Header: React.FC = () => {

    const [menuState, setMenuState] = useState(false)

    const menuHandleClick: () => void = () => {
        setMenuState((prev: boolean) => !prev)
    }

    return (
        <header>
            <div className={styles.header}>
                <h1 className={styles.header__text}>Awesome Kanban Board</h1>
                <Avatar isOpen={menuState} callback={menuHandleClick}/>
            </div>
        </header>
    );
}

export default Header;