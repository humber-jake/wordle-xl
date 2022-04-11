import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

export default function GameEndDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
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
            {/* Statistics, Guess Distribution, Next Puzzle, Share */}
          <Typography gutterBottom>
            Statistics

            Guess Distribution


            Next Puzzle

            Share
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
