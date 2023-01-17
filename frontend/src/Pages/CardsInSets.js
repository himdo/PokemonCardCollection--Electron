import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { channels } from "../shared/constants";
import * as React from 'react';
import CardTile from "../Components/CardTile";
import { Box, CssBaseline, Grid } from "@mui/material";


function CardsInSets(props) {
  const { setId } = useParams()
  const [cards, setCards] = React.useState(null);
  const { getCards, cardsInSets } = props
  useEffect(() => {
    setCards(getCards(setId))
  }, [""]);

  useEffect(() => {
    if (cardsInSets && cardsInSets[setId])
      setCards(cardsInSets[setId])
    else 
      setCards([])
  }, [cardsInSets])
  
  return (
    <Box  sx={{ display: 'flex' }}>
      <CssBaseline />
      <div style={{backgroundColor: '#282c34', display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <br/>
        <div style={{fontSize: 'calc(10px + 2vmin)', paddingBottom: '40px', color:'black', width: '80%', textAlign: 'center', padding: '0px 16px 32px 16px'}}>
          <Box sx={{ bgcolor: '#454c5a', display: 'block' }} style={{padding: '0px 8px 0px 8px', borderRadius: '25px' }}>
            Cards:
          </Box>
        </div>
        <Grid container spacing={3} style={{width: '80%'}}>
          {cards && cards.map((cards) =>
            <Grid item xs key={cards.id} style={{minWidth: '600px'}}>
              <CardTile setId={setId} value={cards}/> 
              <br/>
            </Grid>
          )}
        </Grid>
      </div>
    </Box>
  )
}

export default CardsInSets;