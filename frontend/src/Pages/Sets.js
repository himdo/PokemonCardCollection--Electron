import './Sets.css';
import CssBaseline from '@mui/material/CssBaseline';
import { channels } from '../shared/constants';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, ListItemButton, ListItemText, ListItemIcon, Divider, List, ListItem, Box, IconButton, Toolbar, Typography, Drawer, InputBase, TextField } from '@mui/material';
import { useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SetsTile from '../Components/SetsTile';
import { useLocation, useParams } from 'react-router-dom';

let drawerWidth = 0;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Sets(props) {
  const [open, setOpen] = React.useState(false);
  const [sets, setSets] = React.useState(null);

  useEffect(() => {
    // call api or anything
    console.log(props)
    window.api.send(channels.GET_DATA, { type: 'FetchData', value: 'Sets' })
  }, [""]);

  const handleDrawerOpen = () => {
    drawerWidth=240
    setOpen(true);
  };

  const handleDrawerClose = () => {
    drawerWidth=0

    setOpen(false);
  };

  const setCorrectData = (arg) => {
    try {
      const { type } = arg
      switch (type) {
        case 'Sets':
          console.log(arg['value'])
          setSets(arg['value'])
          break;
      
        default:
          break;
      }
    } catch (error) {
      
      console.log('Error receiving Data: ' + error)
    }
  }
  
  useEffect(() => {
    window.api.receive(channels.GET_DATA, setCorrectData)
    // Clean the listener after the component is dismounted
    return () => {
      // window.api.on.removeAllListeners();
    };
  }, [window.api.on]);

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

      <header className="App-header" style={{paddingTop: '104px', width: '100%'}}>
        <div style={{paddingBottom:'40px', width: '80%',}}>
          <Box sx={{ bgcolor: '#454c5a', display: 'block' }} style={{padding: '0px 8px 0px 8px', borderRadius: '25px' }}>
            <Autocomplete options={[{'label': 'aaaa'}]} renderInput={(params) => 
              <div ref={params.InputProps.ref}>
                <InputBase {...params.inputProps} style={{borderRadius: '25px', border: '2px solid #000', padding: '10px', marginBottom: '8px', marginTop: '8px' }} placeholder="Seach" fullWidth/>
              </div>}
            />
          </Box>
        </div>
        <div style={{width: "40%"}}>
          {sets && sets.map((set) =><div key={set.id}><SetsTile value={set}/> <br/></div>)}
        </div>
        {/* <Button variant="text" onClick={getData}>Text</Button> */}
      </header>
    </Box>
  );
}

export default Sets;
