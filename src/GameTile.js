import React from 'react';
import './styles/GameTileStyles.css'

function GameTile(props) {
    const { answer, guessed, letter } = props;
    return (
        <div className='GameTile'>
            <span className='GameTile-Letter' >{letter}</span>
        </div>
    );
}

export default GameTile;