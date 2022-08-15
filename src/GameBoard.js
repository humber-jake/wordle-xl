import React, { useEffect, useState, createRef, forwardRef, useImperativeHandle, useRef } from 'react';
import GameRow from './GameRow.js'
import Keyboard from './Keyboard'
import { useMemo } from 'react';
import styles from './styles/GameBoardStyles.js'
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles(styles);



function GameBoard(props,ref) {

    const classes = useStyles();
    
    const {answer, maxAttempts, validateGuess,
        boardState, setBoardState, 
        tileEvals, setTileEvals, 
        inputRef, setInputFocus,
        gameOver, setGameOver,
        animating, setAnimating,
        statistics, setStatistics,
        guessedLetters, setGuessedLetters,
        updateKeyboard, displayStats
    } = props;
    
    const flipTime = answer.length * 300 + 300;
    const rows = [...Array(maxAttempts)];
    const wobbles = useMemo(() => rows.map(() => createRef()))
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [guessing, setGuessing] = useState('');
    
    // Clears the input field when new words are chosen, ie at Midnight
    useEffect(()=>{
        setGuessing('')
    },[answer])

    // forwardRef function to trigger GameBoard update when midnight reset happens at App level
    const resetGuessing = () => {
        setGuessing('');
        setGuessedLetters({});
    };

    useImperativeHandle(ref, () => {
        return {
        resetGuessing: resetGuessing
        }
    });

    // Allow only letters in input field
    function handleChange(e){
        setGuessing(e.target.value.replace(/[^a-zA-Z]/ig,''));
    }
    
    // disable all keys but enter, letters, modifiers and backspace
    function handleKeyDown(e){
        let keys = [8,13,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90]
        if(!keys.includes(e.keyCode)) e.preventDefault();
    }

    function updateStats(stats){
        let update = stats;
        update.gamesPlayed++
        if(boardState.includes(answer)){
            update.gamesWon++
            update.guesses[boardState.length]++
        }
        if(!boardState.includes(answer)){
            update.guesses.fail++
            update.currentStreak = 0;
            }
        update.winPercentage = Math.round((update.gamesWon / update.gamesPlayed) * 100)
        update.averageGuesses = Math.round(Object.values(update.guesses).reduce((curr, prev) => prev + curr) / update.gamesPlayed)

        let today = new Date().setHours(0,0,0,0)-0;
        if(boardState.includes(answer) && (today - JSON.parse(localStorage.getItem(`lastPlayed${answer.length}`)) < 86400000 || update.currentStreak === 0)){
            update.currentStreak++
        }
        if(update.currentStreak > update.maxStreak){
            update.maxStreak = update.currentStreak
        }
        return update;
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

    function handleBackspace(){
        let res = guessing;
        res = res.split('');
        res.splice(-1, 1)
        res = res.join('');
        setGuessing(res)
    }

    function handleLetter(letter){
        if(guessing.length < answer.length){
            setGuessing(`${guessing}${letter}`)
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if(guessing.length < answer.length) return;

        if(validateGuess(guessing)){
            wobbles[boardState.length].current.triggerWobble()
            return;
        } 

        let expiration = new Date()
        expiration.setDate(expiration.getDate() + 1)
        expiration.setHours(0,0,0,0);
        expiration = expiration -0;
        localStorage.setItem(`expiration`, expiration)
        
        
        evaluateGuess(guessing);
        setIsEvaluating(true);
        setBoardState([...boardState, guessing]);
        localStorage.setItem(`boardState${answer.length}`, JSON.stringify([...boardState, guessing]))
        if(guessing === answer){
            setTimeout(() => {
                setGameOver(true);
            }, flipTime);
            setTimeout(() => {
                displayStats()
            }, flipTime + 1000);

        }

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
        if(boardState.length === maxAttempts){
            setGameOver(true);
        }
        updateKeyboard([...boardState], [...tileEvals])
    })

    useEffect(() => {
        if(gameOver === true){
                let updatedStats = updateStats(statistics);
                let lastPlayed = new Date().setHours(0,0,0,0) -0;
                localStorage.setItem(`lastPlayed${answer.length}`, lastPlayed)
                setStatistics(updatedStats)
                setTimeout(() => {
                    displayStats()
                }, 1000);
        }
    },[gameOver])

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
                    animating={animating}
                />
    })

    const messages = [
        "Genius!",
        "Magnificent!",
        "Impressive!",
        "Splendid!",
        "Great!",
        "Phew!"
    ]
 
    return (
        <div className={classes.Game} onClick={setInputFocus}>
            <div className={classes.GameBoardContainer}>
                <div className={classes.GameBoard}>
                    {board}

                    {gameOver && 
                        <div className={classes.messages}>{
                                gameOver && !boardState.includes(answer) ?
                                answer.toUpperCase()  : 
                                messages[boardState.length -1] || messages[5]
                                }
                        </div>
                    }
                    <form className={classes.GameBoardForm}>
                        <input 
                            className={classes.GameBoardInput}
                            onKeyDown={handleKeyDown} 
                            ref={inputRef} 
                            type="text" 
                            minLength={answer.length} 
                            maxLength={answer.length} 
                            value={guessing} 
                            onChange={handleChange} 
                            disabled={gameOver}
                            required
                            inputMode='none'
                        />
                        <button className={classes.GameBoardButton} type='submit' onClick={handleSubmit} disabled={isEvaluating}>Guess</button>
                    </form>
                </div>
            </div>
            <div className={classes.keyboard}>
                <Keyboard handleSubmit={handleSubmit} handleBackspace={handleBackspace} handleLetter={handleLetter} guessedLetters={guessedLetters} answer={answer}/>
            </div>
        </div>
    );
}

GameBoard = forwardRef(GameBoard);

export default GameBoard;