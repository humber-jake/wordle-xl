import React from 'react';
import "./styles/Keyboard.css"

function Keyboard(props) {
    const rows = ['qwertyuiop','asdfghjkl','zxcvbnm']
    const keys = rows.map(row => 
        <div className='Keyboard-Row'>{Array.from(row).map(key => (
            <span className='Keyboard-Key'>{key}</span>
        ))}</div>
    )
    return (
        <div className='Keyboard'>
            {keys}
            <div className='Keyboard-Buttons'>
                <button>Enter</button>
                <button>Back</button>
            </div>
        </div>
    );
}

export default Keyboard;