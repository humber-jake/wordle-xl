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

    const board = rows.map((r,i) => {
        return <GameRow 
                    key={i} 
                    id={i} 
                    answer={answer} 
                    boardState={boardState} 
                    guessing={guessing} 
                    currentGuess={i === boardState.length}
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
        return [...result].map(i => i === undefined ? 'absent' : i);
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
        <div className='GameBoard'>
            {board}
            <form>
                <input type="text"  minLength={`${answer.length}`} maxLength={`${answer.length}`} value={guessing} onChange={handleChange}/>
                <br />
                <button type='submit' onClick={handleSubmit} disabled={isEvaluating}>Guess</button>
            </form>
        </div>
    );
}

export default GameBoard;