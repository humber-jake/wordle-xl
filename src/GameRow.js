import React from 'react';
import GameTile from './GameTile.js'
import './styles/GameRowStyles.css'

function GameRow(props) {

    const { answer, boardState, id, guessing, currentGuess } = props;
    const tiles = [...Array(answer.length)]
    const row = tiles.map((t,i) => {
        if(currentGuess){
            return <GameTile key={i} i={i} answer={answer} letter={guessing[i]}/>
        }
        if(boardState[id]){
            return <GameTile key={i} i={i} answer={answer} letter={boardState[id][i]}/>   
        } else {
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