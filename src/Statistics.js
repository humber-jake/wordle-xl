import React, {useState} from 'react';
import Distribution from './Distribution.js'
import styles from './styles/GameEndDialogStyles.js'
import { createUseStyles } from 'react-jss';
import IosShareIcon from '@mui/icons-material/IosShare';
import { fabClasses } from '@mui/material';

let useStyles = createUseStyles(styles)


function Statistics(props) {
    
    let classes = useStyles()
    const {statistics, tileEvals, gameOver, index} = props;
    const [message, setMessage] = useState('Copied!');
    const [open, setOpen] = useState(false);

    let colors = {
        absent: '⬜️',
        present: '🟨',
        correct: '🟩',
    }

    function handleCopy(){

        setOpen(true);

        let result = tileEvals.map(row => {
            return row.map(e => colors[e]).join('')
        }).join('\n')

        let day = `${new Date().getMonth()+1}/${new Date().getDate()}`
        let letters = tileEvals[0].length;

        navigator.clipboard.writeText(`WORDLE ${letters}XL ${day}: \n${result}`).then(function() {
            setMessage('Copied!')
          }, function() {
            setMessage('Something went wrong!')
          });
          setTimeout(() => {
            setOpen(false)
          }, 2000);
    }

    const iconStyles = {
        fontSize: '1.5rem',
        margin: '0 auto',
        marginTop: '-5px'
    }

    return (
        <div className={`${classes.board} ${gameOver ? '' : classes.unfinished}`}>
            <div className={classes.stats}>
                <div className={classes.metric}><span className={classes.figure}>{statistics.gamesPlayed}</span>Played</div>
                <div className={classes.metric}><span className={classes.figure}>{statistics.winPercentage}</span>Win %</div>
                <div className={classes.metric}><span className={classes.figure}>{statistics.currentStreak}</span>Current Streak</div>
                <div className={classes.metric}><span className={classes.figure}>{statistics.maxStreak}</span>Max Streak</div>
                { gameOver &&
                    <div onClick={handleCopy} className={classes.metric}><IosShareIcon sx={iconStyles}/> Share</div>
                }
            </div>

            { open &&
                <div className={classes.messages}>{message.toUpperCase()}</div>
            }
          

            <Distribution data={statistics.guesses} boardNumber={index + 5}/>
        </div>
    );
}

export default Statistics;