import React from 'react';
import Distribution from './Distribution.js'
import styles from './styles/GameEndDialogStyles.js'
import { createUseStyles } from 'react-jss';

let useStyles = createUseStyles(styles)


function Statistics(props) {
    
    let classes = useStyles()
    const {statistics} = props;

    return (
        <div className={classes.board}>
            <div className={classes.stats}>
                <div className={classes.metric}><span className={classes.figure}>{statistics.gamesPlayed}</span>Played</div>
                <div className={classes.metric}><span className={classes.figure}>{statistics.winPercentage}</span>Win %</div>
                <div className={classes.metric}><span className={classes.figure}>{statistics.currentStreak}</span>Current Streak</div>
                <div className={classes.metric}><span className={classes.figure}>{statistics.maxStreak}</span>Max Streak</div>
            </div>

            <Distribution data={statistics.guesses}/>
        </div>
    );
}

export default Statistics;