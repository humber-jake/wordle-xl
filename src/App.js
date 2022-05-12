import './App.css';
import { useEffect, useState } from 'react';
import GameBoard from './GameBoard.js'
import GameEndDialog from './GameEndDialog.js'
import PossibleAnswers from './PossibleAnswers.js'
import PossibleGuesses from './PossibleGuesses.js'
import shuffleSeed from 'shuffle-seed';
import { AppBar, Toolbar, Typography} from '@mui/material';


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
  
function daysSinceEpoch(){
    return Math.floor(new Date() / (1000 * 60 * 60 * 24))
}
  
function getNewWord(){
    let shuffledAnswers = shuffleSeed.shuffle(PossibleAnswers, 'seed')
    let day = daysSinceEpoch() % shuffledAnswers.length;
    console.log(day)
    console.log(PossibleAnswers[day]);
    console.log(shuffledAnswers[day]);
    return shuffledAnswers[day];
}
  
getNewWord();
  
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

      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} align="center">
            Wordle XL
          </Typography>
          <GameEndDialog timer={timer}/>
        </Toolbar>
      </AppBar>

      <GameBoard answer='bogus' maxAttempts={6}/>
    </div>
  );
}

// [TODO]: stats

// [TODO]: Routes for each word length game

// [TODO]: CSS to JSS to dynamically calculate flipTime / apply animations to all letters




export default App;
