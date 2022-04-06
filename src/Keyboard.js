import React, { useState } from 'react';
import "./styles/Keyboard.css"
import Backspace from './styles/backspace.js'

function Keyboard(props) {

    const { handleSubmit, guessedLetters } = props;
    const rows = ['qwertyuiop','asdfghjkl','zxcvbnm']

    const keys = rows.map(row => 
        <div key={row} className='Keyboard-Row'>{Array.from(row).map(key => (
            <span key={key} className={`Keyboard-Key ${guessedLetters[key]}`}>{key}</span>

            // [TODO]: onCLick the span - push {key} to input value / guessing

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