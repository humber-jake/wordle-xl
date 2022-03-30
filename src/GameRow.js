import React from 'react';
import GameTile from './GameTile.js'
import './styles/GameRowStyles.css'

function GameRow(props) {

    const { answer } = props;
    const tiles = [...Array(answer.length)]
    const row = tiles.map((t,i) => <GameTile key={i} i={i} answer={answer} guessed={'broke'}/>)

    return (
        <div className='GameRow'>
            {row}
        </div>
    );
}

export default GameRow;