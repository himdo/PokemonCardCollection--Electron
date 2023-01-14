import { Box, Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import { channels } from "../shared/constants";


function CardTile(props) {
  const value = props.value
  const setId = props.setId

  const requestWebPageOpening = (website) => {
    window.api.send(channels.GET_DATA, { type: 'OpenWebsite', value: website })
  };

  return (
    <Link to={{
      pathname: `/Cards/${setId}/${value.id}`, 
      }} style={{textDecoration: 'none'}}>
      <Box style={{paddingBottom: '16px'}} sx={{ bgcolor: '#454c5a', display: 'block' }}>
        <Grid container spacing={2} style={{color: 'black'}}>
          <Grid item xs={6}  style={{textAlign: 'center'}}>
            <div>
              <img
                src={`${value.images.large}`}
                width={256}
                alt={value.name}
                loading="lazy"
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{maxWidth: '80%'}}><b>Name:</b> {value.name}</div>
            <div style={{maxWidth: '80%'}}><b>HP:</b> {value.hp}</div>
            <div style={{maxWidth: '80%'}}><b>Rarity:</b> {value.rarity}</div>
            <div><b>Number Owned:</b> 0</div>
            <br/>
            <div><b><u>Prices</u></b></div>
            <div><b>Average sell price:</b> {value.cardmarket.prices.averageSellPrice} €</div>
            <div><b>Average sell price (1 Day):</b> {value.cardmarket.prices.avg1} €</div>
            <div><b>Average sell price (7 Day):</b> {value.cardmarket.prices.avg7} €</div>
            <div><b>Average sell price (30 Day):</b> {value.cardmarket.prices.avg30} €</div>
            <div><b>lowPrice:</b> {value.cardmarket.prices.lowPrice} €</div>
            <div><b>trendPrice:</b> {value.cardmarket.prices.trendPrice} €</div>
            <div><b>Last Updated:</b> {value.cardmarket.updatedAt}</div>
            <div onClick={() => (requestWebPageOpening(value.cardmarket.url))}><b>Link:</b> <span style={{cursor: 'pointer', textDecoration: 'underline'}}>{value.cardmarket.url}</span></div>
          </Grid>

          <Grid item xs={6} style={{textAlign: 'center'}}>
            
          </Grid>

          <Grid item xs={6}>
            
          </Grid>
        </Grid>
      </Box>
    </Link>
  );
}

export default CardTile;