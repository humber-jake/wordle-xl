import './App.css';
import { useEffect, useState, useRef } from 'react';
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

function getNewWord(PossibleAnswers){
  let shuffledAnswers = shuffleSeed.shuffle(PossibleAnswers, 'seed')
  let day = Math.floor(new Date() / (1000 * 60 * 60 * 24)) % shuffledAnswers.length;
    console.log(`#${day}: ${shuffledAnswers[day]}` )
    return shuffledAnswers[day];
}

const answers = [FiveLetterAnswers, SixLetterAnswers, SevenLetterAnswers, EightLetterAnswers].map(arr => getNewWord(arr));
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
  const [guessing, setGuessing] = useState('');

  const [boardState, setBoardState] = useState([[],[],[],[]])
  const [tileEvals, setTileEvals] = useState([[],[],[],[]]);
  const [gameOver, setGameOver] = useState([false, false, false, false]);
  const [guessedLetters, setGuessedLetters] = useState([{}, {}, {}, {}]);
  const [animating, setAnimating] = useState(false);

const setState = {
    setBoardState: {},
    setTileEvals: {},
    setGameOver: {},
    setGuessedLetters: {},
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
  })
  
  function handleClick(){
    setInputFocus();
    setGuessing('')
  }

  const routes = numStrings.map((num, i) => 
      <Route path={num} key={num} 
              element={<GameBoard 
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
                        />}
                />
  )

  const header = numStrings.map(num => <NavLink to={`/${num}`} className={ animating ? 'disabled' : ''}><Button onClick={handleClick} variant='string'>{num}</Button></NavLink>)

  header.splice(header.length / 2, 0, <Typography variant="h4" component="div" sx={{fontFamily: "'Patua One', cursive;", margin: "0 2rem"}}>Wordle XL</Typography>)
  
  return (
    <div className="App">
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none", borderBottom: "1px solid lightgray" }}>
        <Toolbar sx={{ minHeight: "50px !important"}} >
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {header}
          </div>
          <GameEndDialog/>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path='/' element={<Navigate to="/five" />} />
        {routes}
      </Routes>

    
    </div>
  );
}

// [TODO]: stats


export default App;
