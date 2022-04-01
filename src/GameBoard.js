import React, { useEffect, useState } from 'react';
import GameRow from './GameRow.js'
import './styles/GameBoardStyles.css'

function GameBoard(props) {

    
    const {answer, maxAttempts} = props;
    const flipTime = answer.length * 200;
    const rows = [...Array(maxAttempts)];
    const [boardState, setBoardState] = useState('')
    const [guessing, setGuessing] = useState('');
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [tileEvals, setTilevals] = useState([]);

    const board = rows.map((r,i) => {
        return <GameRow 
                    key={i} 
                    id={i} 
                    answer={answer} 
                    boardState={boardState} 
                    guessing={guessing} 
                    currentGuess={i === boardState.length}
                    tileEvals={tileEvals[i]}
                />
    })
    function handleChange(e){
        setGuessing(e.target.value);
    }

    function evaluateGuess(){
        let result = Array(answer.length)
        let ans = Array.from(answer)
        let guess = Array.from(guessing)

        // check greens, then remove matches from arrays to avoid double counting
        guess.forEach((l, i) => {
            if(ans[i] === l){
                result[i] = 'correct';
                ans[i] = undefined;
                guess[i] = null;
            }
        })

        // check yellows
        guess.forEach((l, i) => {
            if(ans.includes(l)){
                result[i] = 'present';
            }
        })
        
        // make rest absent
        result = [...result].map(i => i === undefined ? 'absent' : i);
        setTilevals([...tileEvals, result])
    }
    
    function handleSubmit(e){
        e.preventDefault();
        evaluateGuess();
        setIsEvaluating(true);
        setBoardState([...boardState, guessing]);
        setGuessing('')
        setTimeout(() => {
            setIsEvaluating(false);
        }, flipTime);
    }
    
    return (
        <div className='Game'>
            <div className='GameBoard-Container'>
                <div className='GameBoard'>
                    {board}
                    <form className='GameBoard-Form'>
                        <input type="text"  minLength={`${answer.length}`} maxLength={`${answer.length}`} value={guessing} onChange={handleChange}/>
                        <br />
                        <button className='GameBoard-Button' type='submit' onClick={handleSubmit} disabled={isEvaluating}>Guess</button>
                    </form>
                </div>
            </div>
            <div className='keyboard'>
                <p>I AM A KEYBOARD</p>
            </div>
        </div>
    );
}

export default GameBoard;