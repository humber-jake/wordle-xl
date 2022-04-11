import './App.css';
import GameBoard from './GameBoard.js'
import GameEndDialog from './GameEndDialog.js'

function App() {
  return (
    <div className="App">
        <GameBoard answer='bogus' maxAttempts={6}/>
        <GameEndDialog />
    </div>
  );
}

// [TODO]: stats

// [TODO]: Routes for each word length game

// [TODO]: CSS to JSS to dynamically calculate flipTime / apply animations to all letters




export default App;
