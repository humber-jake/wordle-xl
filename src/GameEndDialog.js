import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import BarChartIcon from '@mui/icons-material/BarChart';
import Typography from '@mui/material/Typography';


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

  const [timer, setTimer] = React.useState(getCountdown());
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
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

  return (
    <div>
      <Button variant="string" size="small" onClick={handleClickOpen} style={{marginLeft: '-67px'}}>
        <BarChartIcon fontSize="large"/>
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent>
          <Button autoFocus onClick={handleClose}>
            <CloseIcon/>
          </Button>
            <div>Statistics</div>
            <div>Distribution</div>
            <div>Share</div>
          <div>
              <h3>Next Puzzle:</h3>
              <div style={{textAlign: 'center'}}>{timer.hours}: {timer.minutes}: {timer.seconds}</div>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
