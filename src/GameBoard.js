import React, { useEffect, useState, useRef } from 'react';
import GameRow from './GameRow.js'
import './styles/GameBoardStyles.css'
import Keyboard from './Keyboard'
import PossibleGuesses from './wordlists/5-letter-guesses'

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
    const [guessedLetters, setGuessedLetters] = useState({});
    

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
        setGuessing(e.target.value.replace(/[^a-zA-Z]/ig,''));
    }

    function handleKeyDown(e){
        // disable all keys but enter and letters
        let keys = [8,13,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90]
        if(!keys.includes(e.keyCode)) e.preventDefault();
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

        // update keyboard colours using guessed words and evaluations
        updateKeyboard([...boardState, guessing], [...tileEvals, result]);
    }

    function updateKeyboard(words, evals){
        let result = {}
        
        words.join('').split('').forEach((l,i) => {
            if(result[l] === 'correct') return;
            if(evals.flat()[i] === 'correct') result[l] = evals.flat()[i];
            if(result[l] === 'present') return;
            result[l] = evals.flat()[i];
        });
        setGuessedLetters(result);
    }
    
    function handleSubmit(e){
        if(guessing.length < answer.length) return;
        e.preventDefault();
        if(!PossibleGuesses.includes(guessing)) return;
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
 
    return (
        <div className='Game' onClick={setInputFocus}>
            <div className='GameBoard-Container'>
                <div className='GameBoard'>
                    {board}
                    <form className='GameBoard-Form'>
                        <input 
                            onKeyDown={handleKeyDown} 
                            ref={inputRef} 
                            type="text" 
                            minLength={`${answer.length}`} 
                            maxLength={`${answer.length}`} 
                            value={guessing} 
                            onChange={handleChange} 
                            disabled={gameOver} 
                            required
                        />
                        <button className='GameBoard-Button' type='submit' onClick={handleSubmit} disabled={isEvaluating}>Guess</button>
                    </form>
                </div>
            </div>
            <div className='keyboard-container'>
                <Keyboard handleSubmit={handleSubmit} guessedLetters={guessedLetters}/>
            </div>
        </div>
    );
}

export default GameBoard;