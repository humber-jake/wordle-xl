import './App.css';
import GameBoard from './GameBoard.js'

function App() {
  return (
    <div className="App">
        <GameBoard answer='digit' maxAttempts={6}/>
    </div>
  );
}

// [TODO]: stats

// [TODO]: Routes for each word length game


export default App;
