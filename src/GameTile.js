import React, { useEffect, useState } from 'react';
import './styles/GameTileStyles.css'

function GameTile(props) {

    const { answer, letter, i } = props;
    const [tileColor, setTileColor] = useState('');

    return (
        <div className={`GameTile ${tileColor}`}>
            <span className='GameTile-Letter' >{letter}</span>
        </div>
    );
}

export default GameTile;