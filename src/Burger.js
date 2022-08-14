import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { createUseStyles } from 'react-jss';
import styles from './styles/GameEndDialogStyles.js'

function Burger(props) {

    const handleClickOpen = () => { 
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
    
    let useStyles = createUseStyles(styles)
    let classes = useStyles()
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.burger}>
            <Button variant="string" size="small" onClick={handleClickOpen}>
                <MenuIcon/>
            </Button>
        </div>
    );
}

export default Burger;