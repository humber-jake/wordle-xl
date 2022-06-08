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



function handleDate(){

  
  let today = new Date()
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  tomorrow.setHours(0,0,0,0);
  
  let countdown = {
    hours: Math.floor((tomorrow - today) / (1000 * 60 * 60)).toString().padStart(2,'0'),
    minutes: Math.floor((tomorrow - today) % (1000 * 60 * 60) / (1000 * 60)).toString().padStart(2,'0'),
      seconds: Math.floor((tomorrow - today) % (1000 * 60 * 60) / (1000) % 60).toString().padStart(2,'0'),
    }
    
    return countdown;
}
  
function getNewWord(PossibleAnswers){
  let shuffledAnswers = shuffleSeed.shuffle(PossibleAnswers, 'seed')
  let day = Math.floor(new Date() / (1000 * 60 * 60 * 24)) % shuffledAnswers.length;
    console.log(`#${day}: ${shuffledAnswers[day]}` )
    return shuffledAnswers[day];
}

let FiveLetterWord = getNewWord(FiveLetterAnswers)
let SixLetterWord = getNewWord(SixLetterAnswers)
let SevenLetterWord = getNewWord(SevenLetterAnswers)
let EightLetterWord = getNewWord(EightLetterAnswers)

function validateFiveLetterGuess(guess){
  return !FiveLetterGuesses.includes(guess);
}
function validateSixLetterGuess(guess){
  return !SixLetterGuesses.includes(guess);
}
function validateSevenLetterGuess(guess){
  return !SevenLetterGuesses.includes(guess);
}
function validateEightLetterGuess(guess){
  return !EightLetterGuesses.includes(guess);
}


function App() {

  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    return [ htmlElRef, setFocus ] 
}
  
  const [inputRef, setInputFocus] = useFocus();
  const [guessing, setGuessing] = useState('');

  const [boardState5, setBoardState5] = useState('')
  const [boardState6, setBoardState6] = useState('')
  const [boardState7, setBoardState7] = useState('')
  const [boardState8, setBoardState8] = useState('')
  const [tileEvals5, setTileEvals5] = useState([]);
  const [tileEvals6, setTileEvals6] = useState([]);
  const [tileEvals7, setTileEvals7] = useState([]);
  const [tileEvals8, setTileEvals8] = useState([]);
  const [gameOver5, setGameOver5] = useState(false);
  const [gameOver6, setGameOver6] = useState(false);
  const [gameOver7, setGameOver7] = useState(false);
  const [gameOver8, setGameOver8] = useState(false);
  const [guessedLetters5, setGuessedLetters5] = useState({});
  const [guessedLetters6, setGuessedLetters6] = useState({});
  const [guessedLetters7, setGuessedLetters7] = useState({});
  const [guessedLetters8, setGuessedLetters8] = useState({});
  const [animating, setAnimating] = useState(false);
  const [timer, setTimer] = useState(handleDate());
  
  function handleClick(){
    setInputFocus();
    setGuessing('')
  }

  useEffect(() => {
    const timeout = setInterval(() => {
      setTimer(handleDate());
    }, 1000);
    return () => clearInterval(timeout);
  });
  

  return (
    <div className="App">

      <AppBar position="static" color="transparent" sx={{ boxShadow: "none", borderBottom: "1px solid lightgray" }}>
        <Toolbar sx={{ minHeight: "50px !important"}} >
          <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <NavLink to="/Five" className={ animating ? 'disabled' : ''}><Button onClick={handleClick} variant='string'>Five</Button></NavLink>
            <NavLink to="/Six" className={ animating ? 'disabled' : ''}><Button onClick={handleClick} variant='string'>Six</Button></NavLink>
            <Typography 
                variant="h4" 
                component="div" 
                sx={{
                      fontFamily: "'Patua One', cursive;",
                      margin: "0 2rem"
                    }}>
              Wordle XL
            </Typography>
            <NavLink to="/Seven" className={ animating ? 'disabled' : ''}><Button onClick={handleClick} variant='string'>Seven</Button></NavLink>
            <NavLink to="/Eight" className={ animating ? 'disabled' : ''}><Button onClick={handleClick} variant='string'>Eight</Button></NavLink>
          </div>
          <GameEndDialog timer={timer}/>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path='/' 
               element={<Navigate to="/five" />}
               />
        <Route path='five' 
               element={<GameBoard 
                          answer={FiveLetterWord} 
                          maxAttempts={6} 
                          boardState={boardState5} 
                          setBoardState={setBoardState5} 
                          validateGuess={validateFiveLetterGuess}
                          tileEvals={tileEvals5}
                          setTileEvals={setTileEvals5}
                          inputRef={inputRef}
                          setInputFocus={setInputFocus}
                          gameOver={gameOver5}
                          setGameOver={setGameOver5}
                          guessing={guessing}
                          setGuessing={setGuessing}
                          guessedLetters={guessedLetters5}
                          setGuessedLetters={setGuessedLetters5}
                          animating={animating}
                          setAnimating={setAnimating}
                          
                          />}
                          />
        <Route path='six' 
               element={<GameBoard 
                          answer={SixLetterWord} 
                          maxAttempts={6} 
                          boardState={boardState6} 
                          setBoardState={setBoardState6} 
                          validateGuess={validateSixLetterGuess}
                          tileEvals={tileEvals6}
                          setTileEvals={setTileEvals6}
                          inputRef={inputRef}
                          setInputFocus={setInputFocus}
                          gameOver={gameOver6}
                          setGameOver={setGameOver6}
                          guessing={guessing}
                          setGuessing={setGuessing}
                          guessedLetters={guessedLetters6}
                          setGuessedLetters={setGuessedLetters6}
                          animating={animating}
                          setAnimating={setAnimating}
                          
                          
                          
                          />}
                          />
        <Route path='seven' 
               element={<GameBoard 
                          answer={SevenLetterWord} 
                          maxAttempts={6} 
                          boardState={boardState7} 
                          setBoardState={setBoardState7} 
                          validateGuess={validateSevenLetterGuess}
                          tileEvals={tileEvals7}
                          setTileEvals={setTileEvals7}
                          inputRef={inputRef}
                          setInputFocus={setInputFocus}
                          gameOver={gameOver7}
                          setGameOver={setGameOver7}
                          guessing={guessing}
                          setGuessing={setGuessing}
                          guessedLetters={guessedLetters7}
                          setGuessedLetters={setGuessedLetters7}
                          animating={animating}
                          setAnimating={setAnimating}
                          
                          
                          />}
                          />
        <Route path='eight' 
               element={<GameBoard 
                          answer={EightLetterWord} 
                          maxAttempts={6} 
                          boardState={boardState8} 
                          setBoardState={setBoardState8} 
                          validateGuess={validateEightLetterGuess}
                          tileEvals={tileEvals8}
                          setTileEvals={setTileEvals8}
                          inputRef={inputRef}
                          setInputFocus={setInputFocus}
                          gameOver={gameOver8}
                          setGameOver={setGameOver8}
                          guessing={guessing}
                          setGuessing={setGuessing}
                          guessedLetters={guessedLetters8}
                          setGuessedLetters={setGuessedLetters8}
                          animating={animating}
                          setAnimating={setAnimating}
                          

                                               />}
                                            />
      </Routes>

    
    </div>
  );
}

// [TODO]: stats

// [TODO]: CSS to JSS to dynamically calculate flipTime / apply animations to all letters


export default App;
