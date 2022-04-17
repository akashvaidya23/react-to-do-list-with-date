import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {
    return (
        <button
            onClick={props.btnClickHandler}
            className={styles.btn}
            disabled={props.disable}
            color="danger">
            {props.btnText}
        </button>
    );
};

export default Button;