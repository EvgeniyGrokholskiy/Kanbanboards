import React from 'react';
import {Link} from "react-router-dom";
import styles from "./errorpage.module.css"

const ErrorPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>404</h1>
            <h2>PAGE NOT FOUND</h2>
            <Link className={styles.button} to={"/"}>Go back home</Link>
        </div>
    );
};

export default ErrorPage;