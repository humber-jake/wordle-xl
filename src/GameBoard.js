import React, { useEffect, useState, createRef, forwardRef, useImperativeHandle } from 'react';
import GameRow from './GameRow.js'
import './styles/GameBoardStyles.css'
import Keyboard from './Keyboard'
import { useMemo } from 'react';



function GameBoard(props,ref) {

    const [update, setUpdate] = useState(false)

    const triggerUpdate = () => {
        setUpdate(true);
    }

    useImperativeHandle(ref, () => ({
        triggerUpdate: triggerUpdate
    }))

    const {answer, maxAttempts, validateGuess,
            boardState, setBoardState, 
            tileEvals, setTileEvals, 
            inputRef, setInputFocus,
            gameOver, setGameOver,
            guessing, setGuessing,
            animating, setAnimating,
            guessedLetters, setGuessedLetters,
            updateKeyboard
        } = props;

    const flipTime = answer.length * 300 + 300;
    const rows = [...Array(maxAttempts)];
    const wobbles = useMemo(() => rows.map(() => createRef()))

    const [isEvaluating, setIsEvaluating] = useState(false);
    
    // Allow only letters
    function handleChange(e){
        setGuessing(e.target.value.replace(/[^a-zA-Z]/ig,''));
    }

    function handleKeyDown(e){
        // disable all keys but enter and letters
        let keys = [8,13,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90]
        if(!keys.includes(e.keyCode)) e.preventDefault();
    }

    function evaluateGuess(guessing){
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
        setTileEvals([...tileEvals, result])

        // update keyboard colours using guessed words and evaluations
        updateKeyboard([...boardState, guessing], [...tileEvals, result]);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(guessing.length < answer.length) return;
        if(validateGuess(guessing)){
            wobbles[boardState.length].current.triggerWobble()
            return;
        } 
        evaluateGuess(guessing);
        setIsEvaluating(true);
        setBoardState([...boardState, guessing]);
        localStorage.setItem(`boardState${answer.length}`, JSON.stringify([...boardState, guessing]))
        if(guessing === answer) setGameOver('winner')
        else if(boardState.length === maxAttempts) setGameOver('loser');
        setGuessing('')

        setTimeout(() => {
            setIsEvaluating(false);
        }, flipTime);
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
        }, flipTime);
    }


    useEffect(()=> {
        updateKeyboard([...boardState], [...tileEvals])
    })

    const board = rows.map((r,i) => {
        return <GameRow 
                    ref={wobbles[i]} 
                    key={i} 
                    idx={i} 
                    answer={answer} 
                    boardState={boardState} 
                    guessing={guessing} 
                    currentGuess={i === boardState.length}
                    tileEvals={tileEvals[i] || []}
                    gameOver={gameOver}
                    animating={animating}
                />
    })
 
    return (
        <div className='Game' onClick={setInputFocus}>
            <div className='GameBoard-Container'>
                <div className='GameBoard'>
                    {board}
                    {gameOver &&
                     <div>Game Over!</div>
                    }
                    <form className='GameBoard-Form'>
                        <input 
                            onKeyDown={handleKeyDown} 
                            ref={inputRef} 
                            type="text" 
                            minLength={answer.length} 
                            maxLength={answer.length} 
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
                <Keyboard handleSubmit={handleSubmit} guessedLetters={guessedLetters} answer={answer}/>
            </div>
        </div>
    );
}

GameBoard = forwardRef(GameBoard);

export default GameBoard;