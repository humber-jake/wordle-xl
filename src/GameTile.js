import React from 'react';
import './styles/GameTileStyles.css'

function GameTile(props) {
    const { answer, guessed, i } = props;
    return (
        <div className='GameTile'>
            <span className='GameTile-Letter' >{Array.from(guessed)[i]}</span>
        </div>
    );
}

export default GameTile;