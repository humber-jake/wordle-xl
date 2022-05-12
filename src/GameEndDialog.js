import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import BarChartIcon from '@mui/icons-material/BarChart';
import Typography from '@mui/material/Typography';

export default function GameEndDialog(props) {

  const {timer} = props;
  const [open, setOpen] = React.useState(false);

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
          <Typography gutterBottom>
            <h1>Statistics</h1>
            <div>Distribution</div>
            <div>
              <h3>Next Puzzle:</h3>
              <p style={{textAlign: 'center'}}>{timer.hours}: {timer.minutes}: {timer.seconds}</p>
            </div>
            <div>Share</div>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
