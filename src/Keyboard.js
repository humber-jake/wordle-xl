import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Backspace from './styles/backspace.js'

function Keyboard(props, ref) {

    const { handleSubmit, handleBackspace, guessedLetters, answer } = props;
    
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
          },
          "@media screen and (max-width: 420px)": {
            Keyboard:{
                width: '350px'
              },
              KeyboardKey:{
                width: '26px',
                height: '40px',
              },
              Button:{
                height: '44px',
              },
          },
    }
    
    const useStyles = createUseStyles(styles);
    const classes = useStyles();
    
    const rows = ['qwertyuiop','asdfghjkl','zxcvbnm']
    
    const keys = rows.map(row => 
        <div key={row} className={classes.KeyboardRow}>
          {Array.from(row).map(k => (
            <span key={k} className={`${classes.KeyboardKey} ${guessedLetters[k]}`}>{k}</span>
        ))}</div>
    )

    Object.entries(keys)[2][1].props.children.splice(rows[2].length, 0, <button key='backspace' className={classes.Button} onClick={handleBackspace}>{Backspace}</button>)
    Object.entries(keys)[2][1].props.children.splice(0,0, <button key='enter' className={classes.Button} onClick={handleSubmit}>Enter</button>)


    return (
        <div className={classes.Keyboard}>
            {keys}
        </div>
    );
}

export default Keyboard;