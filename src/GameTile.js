import React from 'react';
import './styles/GameTileStyles.css'

function GameTile(props) {

    const { letter, evaluation} = props;



    return (
        <div className={`GameTile ${evaluation}`}>
            <span className='GameTile-Letter' >{letter}</span>
        </div>
    );
}

export default GameTile;