import React from 'react';
import GameRow from './GameRow.js'
import './styles/GameBoardStyles.css'

function GameBoard(props) {

    const {answer, maxAttempts} = props;
    const rows = [...Array(maxAttempts)];
    const board = rows.map((r,i) => <GameRow key={i} answer={answer}/>)

    return (
        <div className='GameBoard'>
            {board}
        </div>
    );
}

export default GameBoard;