import React, { useEffect, useState } from 'react';
import GameRow from './GameRow.js'
import './styles/GameBoardStyles.css'

function GameBoard(props) {

    
    const {answer, maxAttempts} = props;
    const rows = [...Array(maxAttempts)];
    const [boardState, setBoardState] = useState('')
    const [guessing, setGuessing] = useState('');

    const board = rows.map((r,i) => {
        return <GameRow key={i} id={i} answer={answer} boardState={boardState} guessing={guessing} currentGuess={i === boardState.length}/>
    })
    
    function handleSubmit(e){
        e.preventDefault();
        setBoardState([...boardState, guessing]);
        setGuessing('')
    }
    function handleChange(e){
        setGuessing(e.target.value);
    }

    return (
        <div className='GameBoard'>
            {board}
            <form>
                <input type="text"  maxLength={5} value={guessing} onChange={handleChange}/>
                <br />
                <button type='submit' onClick={handleSubmit}>Guess</button>
            </form>
        </div>
    );
}

export default GameBoard;