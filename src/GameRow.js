import React from 'react';
import GameTile from './GameTile.js'
import './styles/GameRowStyles.css'

function GameRow(props) {

    const { answer, boardState, id, guessing, currentGuess, tileEvals, gameOver } = props;
    const tiles = [...Array(answer.length)]
    
    const row = tiles.map((t,i) => {
        const highlighted = guessing.length > i;
        if(currentGuess){
            // renders controlled input if currentGuess is true
            return <GameTile key={i} i={i} answer={answer} letter={guessing[i]} highlighted={highlighted}/>
        }
        if(boardState[id]){
            // else renders row with evaluations
            const evaluation = tileEvals[i];
            return <GameTile key={i} i={i} answer={answer} letter={boardState[id][i]} evaluation={evaluation}  gameOver={gameOver}/>   
        } else {
            // else renders empty row
            return <GameTile key={i} i={i} answer={answer}/> 
        }
    })

    return (
        <div className={`GameRow ${ boardState.length -1 === id ? gameOver : '' }`}>
            {row}
        </div>
    );
}

export default GameRow;