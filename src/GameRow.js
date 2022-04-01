import React, { useEffect } from 'react';
import GameTile from './GameTile.js'
import './styles/GameRowStyles.css'

function GameRow(props) {

    const { answer, boardState, id, guessing, currentGuess, isEvaluating } = props;
    const tiles = [...Array(answer.length)]

    const row = tiles.map((t,i) => {
        if(currentGuess){
            // renders controlled input if currentGuess is true
            return <GameTile key={i} i={i} answer={answer} letter={guessing[i]} isEvaluating={isEvaluating}/>
        }
        if(boardState[id]){
            // else renders row with evaluations
            return <GameTile key={i} i={i} answer={answer} letter={boardState[id][i]} />   
        } else {
            // else renders empty row
            return <GameTile key={i} i={i} answer={answer}/> 
        }
    })

    return (
        <div className='GameRow'>
            {row}
        </div>
    );
}

export default GameRow;