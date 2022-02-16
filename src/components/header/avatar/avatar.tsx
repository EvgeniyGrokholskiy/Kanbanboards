import React from 'react';
import Menu from "../menu/menu";
import styles from "./avatar.module.css";
import {IAvatarProps} from "../../interfases/interfasesAndTypes";
import {ReactComponent as DownArrow} from "../../../assets/images/arrow-down.svg";
import {ReactComponent as AvatarIMG} from "../../../assets/images/user-avatar.svg";


const Avatar:React.FC<IAvatarProps> = ({isOpen, callback}:IAvatarProps) => {

    return (
        <div className={styles.wrapper}>
            <AvatarIMG/>
            <div className={`${styles.arrow} ${isOpen ? styles.arrow_up : null}`} onClick={callback}>
                <DownArrow/>
            </div>
            {
                isOpen? <div className={styles.menu}><Menu/></div> : null
            }
        </div>
    );
}

export default Avatar;