import logo from './logo.svg';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { channels } from './shared/constants';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, ListItemButton, ListItemText, ListItemIcon, Divider, List, ListItem, Box, IconButton, Toolbar, Typography, Drawer, Button } from '@mui/material';
import { useEffect } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// const { ipcRenderer } = window.require('electron');
const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(null);

  useEffect(() => {
    // call api or anything
    console.log("loaded");
    window.api.send(channels.GET_DATA, { product: 'loaded' })
  }, [""]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getData = () => {
    window.api.send(channels.GET_DATA, { product: 'notebook' })
  };

  useEffect(() => {
    window.api.receive(channels.GET_DATA, setData)
    // Clean the listener after the component is dismounted
    return () => {
      // window.api.on.removeAllListeners();
    };
  }, [window.api.on, data]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {/* {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key='Sets' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CalendarTodayIcon/>
              </ListItemIcon>
              <ListItemText primary='Card Sets' />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {['My Cards', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <DrawerHeader />
      <header className="App-header">
        {data && <h2>{data}</h2>}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="text" onClick={getData}>Text</Button>
      </header>
    </Box>
  );
}

export default App;
