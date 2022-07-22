import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Backspace from './styles/backspace.js'

function Keyboard(props, ref) {

    const { handleSubmit, guessedLetters, answer } = props;
    const rows = ['qwertyuiop','asdfghjkl','zxcvbnm']

    const styles = {
        Keyboard: {
          width: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        },
        KeyboardRow: {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2px"
        },
        KeyboardKey: {
          fontWeight: "400",
          textTransform: "uppercase",
          width: "2rem",
          height: "3rem",
          padding: "2px",
          margin: "2px",
          backgroundColor: "#d3d6da",
          display: "flex",
          alignItems: "center",
          borderRadius: "5px",
          justifyContent: "center",
          "&.correct": {
            backgroundColor: "#6aaa64"
          },
          "&.present": {
            backgroundColor: "#c9b458"
          },
          "&.absent": {
            backgroundColor: "#787c7e"
          },
        },
        KeyboardButtons: {
          display: "flex",
          width: "99%",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "-58px 2px 2px 2px",
        },
        Button: {
            border: "none",
            fontWeight: "400",
            textTransform: "uppercase",
            width: "4rem",
            height: "52px",
            margin: "2px",
            background: "#d3d6da",
            display: "flex",
            alignItems: "center",
            borderRadius: "5px",
            justifyContent: "center"
          }     
    }

    const useStyles = createUseStyles(styles);
    const classes = useStyles();

    const keys = rows.map(row => 
        <div key={row} className={classes.KeyboardRow}>
          {Array.from(row).map(k => (
            <span key={k} className={`${classes.KeyboardKey} ${guessedLetters[k]}`}>{k}</span>

            // [TODO]: onCLick the span - push {key} to input value / guessing

        ))}</div>
    )


    return (
        <div className={classes.Keyboard}>
            {keys}
            <div className={classes.KeyboardButtons}>
                <button className={classes.Button} onClick={handleSubmit}>Enter</button>
                <button className={classes.Button}>{Backspace}</button>
            </div>
        </div>

        
    );
}

export default Keyboard;