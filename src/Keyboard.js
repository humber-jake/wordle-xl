import React from 'react';
import "./styles/Keyboard.css"
import Backspace from './styles/backspace.js'

function Keyboard(props) {

    const { handleSubmit } = props;
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
                <button onClick={handleSubmit}>Enter</button>
                <button className='Backspace'>
                    {Backspace}
                </button>
            </div>
        </div>

        
    );
}

export default Keyboard;