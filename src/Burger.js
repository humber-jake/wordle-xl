import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { createUseStyles } from 'react-jss';
import styles from './styles/GameEndDialogStyles.js'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from 'react-router-dom';

function Burger(props) {

  const {numStrings} = props;


  const menuItems = numStrings.map((num, i) => <MenuItem gutters='lg' key={i}>
                                                <NavLink to={`/${num}`} key={num} style={{
                                                    margin: '0',
                                                    width: '100%'
                                                }}>
                                                    <Button variant='string'>{num}</Button>
                                                </NavLink>
                                            </MenuItem>)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let useStyles = createUseStyles(styles)
  let classes = useStyles()

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {menuItems}
      </Menu>
    </React.Fragment>
  );
}
    

export default Burger;