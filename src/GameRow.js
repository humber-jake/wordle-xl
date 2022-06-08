import React, { useEffect, useState } from 'react';
import GameTile from './GameTile.js'
import styles from './styles/GameRowStyles.js'
// import './styles/GameRowStyles.css'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(styles);

function GameRow(props) {
    
    const classes = useStyles();
    
    const { answer, boardState, idx, guessing, currentGuess, tileEvals, gameOver, wobble, animating } = props;
    const tiles = [...Array(answer.length)]
    

    const row = tiles.map((t,i) => {
        const highlighted = guessing.length > i;

        if(currentGuess){
            // renders controlled input if currentGuess is true
            return <GameTile key={i} i={i} answer={answer} letter={guessing[i]} highlighted={highlighted}/>
        }
        if(boardState[idx]){
            // else renders row with evaluations
            const evaluation = tileEvals[i];
            return <GameTile key={i} i={i} answer={answer} letter={boardState[idx][i]} animating={animating && boardState.length -1 === idx} evaluation={evaluation} isWinner={boardState[idx] === answer ? true : false}/>   
        } else {
            // else renders empty row
            return <GameTile key={i} i={i} answer={answer}/> 
        }
    })
  
    
    return (
        <div className={`${classes.GameRow} ${wobble ? classes.wobble : ''}`}>
            {row}
        </div>
    );
}

export default GameRow;