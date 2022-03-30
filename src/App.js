import './App.css';
import GameBoard from './GameBoard.js'

function App() {
  return (
    <div className="App">
      <GameBoard answer='beast' maxAttempts={6}/>
    </div>
  );
}

export default App;
