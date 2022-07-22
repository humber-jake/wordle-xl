import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import BarChartIcon from '@mui/icons-material/BarChart';
import Statistics from './Statistics.js'
import styles from './styles/GameEndDialogStyles.js'
import { createUseStyles } from 'react-jss';

let useStyles = createUseStyles(styles)

function getCountdown(){
  
  
  let today = new Date()
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  tomorrow.setHours(0,0,0,0);
  
  let countdown = {
    hours: Math.floor((tomorrow - today) / (1000 * 60 * 60)).toString().padStart(2,'0'),
    minutes: Math.floor((tomorrow - today) % (1000 * 60 * 60) / (1000 * 60)).toString().padStart(2,'0'),
    seconds: Math.floor((tomorrow - today) % (1000 * 60 * 60) / (1000) % 60).toString().padStart(2,'0'),
  }
  return countdown;
}


export default function GameEndDialog(props) {
  
  let classes = useStyles()
  const [timer, setTimer] = React.useState(getCountdown());
  const [open, setOpen] = React.useState(false);
  const {reset, statistics} = props;

  React.useEffect(() => {

    if(timer.hours === '00' && timer.minutes === '00' && timer.seconds === '00' ){
      // using setTimeout to account for the second between a zeroed out clock and a new day
      setTimeout(() => {
        reset();
      }, 1000)
    }

    const timeout = setInterval(() => {
      setTimer(getCountdown());
    }, 1000);
    return () => clearInterval(timeout);
  }, [timer.seconds]);


  const handleClickOpen = () => { 
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let charts = statistics.map((chart, i) => <Statistics key={i} statistics={chart}/>)

  return (
    <div>
      <Button variant="string" size="small" onClick={handleClickOpen} style={{marginLeft: '-67px'}}>
        <BarChartIcon fontSize="large"/>
      </Button>
      <Dialog
        fullWidth
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent>
          <Button autoFocus onClick={handleClose}>
            <CloseIcon/>
          </Button>

            <h1 className={classes.statsTitle}>Statistics</h1>
          <div className={classes.charts}>
            {charts}
          </div>

            <div>Share</div>

            <div className={classes.timerContainer}>
              <div className={classes.timerTitle}>Next Puzzle</div>
              <div className={classes.timer}>{timer.hours}:{timer.minutes}:{timer.seconds}</div>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
