import './App.css';
import { useState, useRef, useEffect } from 'react';
import GameBoard from './GameBoard.js'
import GameEndDialog from './GameEndDialog.js'
import FiveLetterAnswers from './wordlists/5-letter-answers'
import FiveLetterGuesses from './wordlists/5-letter-guesses'
import SixLetterAnswers from './wordlists/6-letter-answers'
import SixLetterGuesses from './wordlists/6-letter-guesses'
import SevenLetterAnswers from './wordlists/7-letter-answers'
import SevenLetterGuesses from './wordlists/7-letter-guesses'
import EightLetterAnswers from './wordlists/8-letter-answers'
import EightLetterGuesses from './wordlists/8-letter-guesses'
import shuffleSeed from 'shuffle-seed';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom'

  const getAnswers = () => {
      function getNewWord(PossibleAnswers){
        let shuffledAnswers = shuffleSeed.shuffle(PossibleAnswers, 'seed')
        let day = Math.floor(new Date() / (1000 * 60 * 60 * 24)) % shuffledAnswers.length;
          console.log(`#${day}: ${shuffledAnswers[day]}` )
          return shuffledAnswers[day];
      }
      return [FiveLetterAnswers, SixLetterAnswers, SevenLetterAnswers, EightLetterAnswers].map(arr => getNewWord(arr));
  }

  let answers = getAnswers();
  const guesses = [FiveLetterGuesses, SixLetterGuesses, SevenLetterGuesses, EightLetterGuesses]
  const validations = {}
  const numStrings = ['Five','Six','Seven','Eight']
  
  answers.forEach((ans, i) => {
    validations[i] = function(guess){
      return !guesses[i].includes(guess);
    }
  })

function App() {
  

  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    return [ htmlElRef, setFocus ] 
  }


  const [inputRef, setInputFocus] = useFocus();
  const [didMount, setDidMount] = useState(false);
  const [guessing, setGuessing] = useState('');


  // initialize master state objects containing state for each board
  const [boardState, setBoardState] = useState(Array.from(numStrings, x => []))
  const [tileEvals, setTileEvals] = useState(Array.from(numStrings, x => []));
  const [gameOver, setGameOver] = useState(Array.from(numStrings, x => false));
  const [guessedLetters, setGuessedLetters] = useState(Array.from(numStrings, x => []));
  const [animating, setAnimating] = useState(false);


  function reset(){
      answers = getAnswers();
      setGuessing('');
      setBoardState(Array.from(numStrings, x => []))
      setTileEvals(Array.from(numStrings, x => []));
      setGameOver(Array.from(numStrings, x => false));
      setGuessedLetters(Array.from(numStrings, x => {}));
      setAnimating(false);
  }

  function handleClick(){
    setInputFocus();
    setGuessing('')
  }
  
  // Create setstate functions for each board
  const setState = {
    setBoardState: {},
    setTileEvals: {},
    setGameOver: {},
    setGuessedLetters: {},
    updateKeyboard: {},
  };

  boardState.forEach((board, i) => {

    setState.setBoardState[i] = function(update){
      let newState = boardState;
      newState[i] = update;
      setBoardState(newState)
    }

    setState.setTileEvals[i] = function(update){
      let newState = tileEvals;
      newState[i] = update;
      setTileEvals(newState)
    }

    setState.setGameOver[i] = function(update){
      let newState = gameOver;
      newState[i] = update;
      setGameOver(newState)
    }

    setState.setGuessedLetters[i] = function(update){
      let newState = guessedLetters;
      newState[i] = update;
      setGuessedLetters(newState)
    }

    setState.updateKeyboard[i] = function(words, evals, isFromStorage){
      let result = {}
      if(words.length <= 0) return;
      words.join('').split('').forEach((l,i) => {
          if(result[l] === 'correct') return;
          if(evals.flat()[i] === 'correct') result[l] = evals.flat()[i];
          if(result[l] === 'present') return;
          result[l] = evals.flat()[i];
      });
      if(isFromStorage){
        setState.setGuessedLetters[i](result);
      } else {
        setTimeout(()=>{
            setState.setGuessedLetters[i](result);
        }, (300 + 300 * answers[i].length));
      }
    }
  })

  // =================================
  // Getting boardstate from Local Storage
  // =================================
  

  const updateRef = useRef();

  useEffect(() => {

    setInputFocus();

    // check expiration of guesses;
    localStorage.setItem('today', new Date()-0)
    if(localStorage.getItem('expiration') < localStorage.getItem('today')){
      localStorage.clear()
    }

      // reset()

    let newBoardState = boardState;
    numStrings.forEach((num, i) => {
      if(localStorage.getItem(`boardState${i+5}`)){
        newBoardState[i] = JSON.parse(localStorage.getItem(`boardState${i+5}`))
        setBoardState(newBoardState);
      }
    })
    
    let newTileEvals = tileEvals;
    
    boardState.forEach((board, boardIndex) => {
      board.forEach((word, wordIndex) => {
        let result = Array(answers[boardIndex].length)
        let ans = Array.from(answers[boardIndex].toLowerCase())
        let guess = Array.from(word.toLowerCase())
    
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
        newTileEvals[boardIndex].push(result);

        if(word === answers[boardIndex]){
          setState.setGameOver[boardIndex](true)
        }
      })
      setState.updateKeyboard[boardIndex](boardState[boardIndex], newTileEvals[boardIndex], true);
    })
    setTileEvals(newTileEvals);
    setDidMount(true);
  }, [])

const routes = numStrings.map((num, i) => 
        <Route path={num} key={num} 
                element={<GameBoard 
                          ref={updateRef}
                          answer={answers[i]} 
                          maxAttempts={6} 
                          boardState={boardState[i]} 
                          setBoardState={setState.setBoardState[i]} 
                          validateGuess={validations[i]}
                          tileEvals={tileEvals[i]}
                          setTileEvals={setState.setTileEvals[i]}
                          inputRef={inputRef}
                          setInputFocus={setInputFocus}
                          gameOver={gameOver[i]}
                          setGameOver={setState.setGameOver[i]}
                          guessing={guessing}
                          setGuessing={setGuessing}
                          guessedLetters={guessedLetters[i]}
                          setGuessedLetters={setState.setGuessedLetters[i]}
                          animating={animating}
                          setAnimating={setAnimating}
                          updateKeyboard={setState.updateKeyboard[i]}
                          />}
                  />
  )

  // map links for each game, splice title into the middle for layout purposes
  const header = numStrings.map((num, i) => <NavLink to={`/${num}`} key={num} className={ animating ? 'disabled' : ''}><Button onClick={handleClick} variant='string'>{num}</Button></NavLink>)
  header.splice(header.length / 2, 0, <Typography key='title' variant="h4" component="div" sx={{fontFamily: "'Patua One', cursive;", margin: "0 2rem"}}>Wordle XL</Typography>)
  
  return (
    <div className="App">
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none", borderBottom: "1px solid lightgray" }}>
        <Toolbar sx={{ minHeight: "50px !important"}} >
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {header}
          </div>
          <GameEndDialog reset={reset}/>
        </Toolbar>
      </AppBar>

      <Routes>
        {routes}
        <Route path='*' element={<Navigate to="/five" />} />
      </Routes>

    </div>
  );
}

// [TODO]: stats

export default App;
