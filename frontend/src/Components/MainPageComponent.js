// import './Sets.css';
import CssBaseline from '@mui/material/CssBaseline';
import { channels } from '../shared/constants';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, ListItemButton, ListItemText, ListItemIcon, Divider, List, ListItem, Box, IconButton, Toolbar, Typography, Drawer } from '@mui/material';
import { useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { BrowserRouter, Redirect, Route, useParams } from 'react-router-dom';

import Sets from '../Pages/Sets';
import CardsInSets from '../Pages/CardsInSets';


let drawerWidth = 0;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function MainPageComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [sets, setSets] = React.useState(null);
  const [cardsInSets, setCardsInSets] = React.useState(null);

  useEffect(() => {
    // call api or anything
    console.log(props)
    window.api.send(channels.GET_DATA, { type: 'FetchData', value: 'Sets' })
    // window.api.send(channels.GET_DATA, { type: 'FetchData', value: 'CardsInSet', setId: setId })

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
          
        case 'CardsInSet':
          let updateValue = {}
          updateValue[arg.setId] = arg.value
          setCardsInSets(cardsInSets => ({...updateValue, ...cardsInSets}))
          break
      
        default:
          console.log()
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

  function getCards (setId) {
    console.log(setId)
    if (cardsInSets && cardsInSets[setId]) {
      return cardsInSets[setId]
    }
    else {
      window.api.send(channels.GET_DATA, { type: 'FetchData', value: 'CardsInSet', setId: setId })
    }
    return []
  }


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

      <header style={{paddingTop: '48px'}}>
        <BrowserRouter>
          <Route path="/Cards/:setId/:cardId"/>
          {/* <Route path="/Cards/:setId/" component={CardsInSets}/> */}
          <Route path="/Cards/:setId/" render={() => <CardsInSets getCards={getCards} cardsInSets={cardsInSets}/>}/>
          <Route path="/Sets" render={() => <Sets sets={sets}/>} />
          <Route path="/">
            <Redirect to="/Sets" />
          </Route>
        </BrowserRouter>
      </header>
    </Box>
  );
}

export default MainPageComponent;
