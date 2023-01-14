import { Box, Grid } from "@mui/material";
import { Link } from 'react-router-dom';

function SetsTile(props) {
  const value = props.value
  return (
    <Link to={{
      pathname: `/Cards/${value.id}`, 
      }} style={{textDecoration: 'none'}}>
      <Box style={{paddingBottom: '16px', borderRadius: '25px'}} sx={{ bgcolor: '#454c5a', display: 'block' }}>
        <Grid container spacing={2} style={{color: 'black'}}>
          <Grid item xs={6}  style={{textAlign: 'center'}}>
            <div>
              <img
                src={`${value.images.logo}`}
                width={128}
                alt={value.name}
                loading="lazy"
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{maxWidth: '80%'}}>{value.name}</div>
          </Grid>

          <Grid item xs={6} style={{textAlign: 'center'}}>
            <img
              src={`${value.images.symbol}`}
              width={32}
              alt={value.name}
              loading="lazy"
            />
          </Grid>

          <Grid item xs={6}>
            <div style={{fontSize: '12px'}}>{value.series}</div>
            <div style={{fontSize: '12px'}}>{value.releaseDate}</div>
            <div style={{fontSize: '16px'}}>0 / {value.total}</div>
          </Grid>
        </Grid>
      </Box>
    </Link>
  );
}

export default SetsTile;