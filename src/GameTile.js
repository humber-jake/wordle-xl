import React from 'react';
import './styles/GameTileStyles.css'

function GameTile(props) {

    const { letter, evaluation, highlighted } = props;



    return (
        <div className={`GameTile ${evaluation} ${highlighted ? 'highlighted' : ''}`}>
            <span className='GameTile-Letter' >{letter}</span>
        </div>
    );
}

export default GameTile;