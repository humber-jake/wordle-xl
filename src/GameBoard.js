import React, { useEffect, useState, useRef } from 'react';
import GameRow from './GameRow.js'
import './styles/GameBoardStyles.css'
import Keyboard from './Keyboard'

function GameBoard(props) {

    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
        return [ htmlElRef, setFocus ] 
    }

    const [inputRef, setInputFocus] = useFocus();
    const {answer, maxAttempts} = props;
    const flipTime = answer.length * 200;
    const rows = [...Array(maxAttempts)];
    const [boardState, setBoardState] = useState('')
    const [guessing, setGuessing] = useState('');
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [tileEvals, setTilevals] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    const board = rows.map((r,i) => {
        return <GameRow 
                    key={i} 
                    id={i} 
                    answer={answer} 
                    boardState={boardState} 
                    guessing={guessing} 
                    currentGuess={i === boardState.length}
                    tileEvals={tileEvals[i]}
                    gameOver={gameOver}
                />
    })
    function handleChange(e){
        setGuessing(e.target.value);
    }

    async function evaluateGuess(){
        let result = Array(answer.length)
        let ans = Array.from(answer.toLowerCase())
        let guess = Array.from(guessing.toLowerCase())

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
                ans[ans.indexOf(l)] = undefined;
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
        if(guessing === answer) setGameOver('winner')
        else if(boardState.length + 1 === maxAttempts) setGameOver('loser');
        setGuessing('')
        setTimeout(() => {
            setIsEvaluating(false);
        }, flipTime);
    }
    
// [TODO]: on key input, make the Tile pop
// [TODO]: on submit, make tiles rotate and change colour
// [TODO]: on win, animate tiles

    return (
        <div className='Game' onClick={setInputFocus}>
            <div className='GameBoard-Container'>
                <div className='GameBoard'>
                    {!gameOver ? 'game on' : `${gameOver}`}
                    {board}
                    <form className='GameBoard-Form'>
                        <input ref={inputRef} type="text" minLength={`${answer.length}`} maxLength={`${answer.length}`} value={guessing} onChange={handleChange} disabled={gameOver}/>
                        <button className='GameBoard-Button' type='submit' onClick={handleSubmit} disabled={isEvaluating}>Guess</button>
                    </form>
                </div>
            </div>
            <div className='keyboard-container'>
                <Keyboard handleSubmit={handleSubmit}/>
            </div>
        </div>
    );
}

export default GameBoard;