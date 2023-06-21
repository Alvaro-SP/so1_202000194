
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Navbar = () => {
   return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <DashboardIcon sx={{ fontSize: 40 }}/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SOPES 1
            </Typography>
            <Button color="inherit">202000119</Button>
            <Button color="inherit">Y</Button>
            <Button color="inherit">202000194</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
};

export default Navbar;
