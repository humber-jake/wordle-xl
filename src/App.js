import './App.css';
import { useEffect, useState } from 'react';
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
    console.log(day)
    console.log(PossibleAnswers[day]);
    console.log(shuffledAnswers[day]);
    return shuffledAnswers[day];
}

let FiveLetterWord = getNewWord(FiveLetterAnswers)
let SixLetterWord = getNewWord(SixLetterAnswers)
let SevenLetterWord = getNewWord(SevenLetterAnswers)
let EightLetterWord = getNewWord(EightLetterAnswers)
  
function App() {
      
  const [timer, setTimer] = useState(handleDate());
  
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
            <NavLink to="/Five"><Button variant='string'>Five</Button></NavLink>
            <NavLink to="/Six"><Button variant='string'>Six</Button></NavLink>
            <Typography 
                variant="h4" 
                component="div" 
                sx={{
                      fontFamily: "'Patua One', cursive;",
                      margin: "0 2rem"
                    }}>
              Wordle XL
            </Typography>
            <NavLink to="/Seven"><Button variant='string'>Seven</Button></NavLink>
            <NavLink to="/Eight"><Button variant='string'>Eight</Button></NavLink>
          </div>
          <GameEndDialog timer={timer}/>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path='/' element={<Navigate to="/five" />}/>
        <Route path='five' element={<GameBoard answer={FiveLetterWord} maxAttempts={6} PossibleGuesses={FiveLetterGuesses}/>}/>
        <Route path='six' element={<GameBoard answer={SixLetterWord} maxAttempts={6} PossibleGuesses={SixLetterGuesses}/>}/>
        <Route path='seven' element={<GameBoard answer={SevenLetterWord} maxAttempts={6} PossibleGuesses={SevenLetterGuesses}/>}/>
        <Route path='eight' element={<GameBoard answer={EightLetterWord} maxAttempts={6} PossibleGuesses={EightLetterGuesses}/>}/>
      </Routes>

    
    </div>
  );
}

// [TODO]: stats

// [TODO]: Routes for each word length game

// [TODO]: CSS to JSS to dynamically calculate flipTime / apply animations to all letters




export default App;
