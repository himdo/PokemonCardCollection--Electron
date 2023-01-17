import './Sets.css';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, InputBase, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SetsTile from '../Components/SetsTile';

function Sets(props) {
  const sets = props.sets

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <header className="App-header" style={{paddingTop: '32px', width: '100%', minWidth: '500px'}}>
        <div style={{paddingBottom:'40px', width: '80%', padding: '0px 16px 32px 16px' }}>
          <Box sx={{ bgcolor: '#454c5a', display: 'block' }} style={{padding: '0px 8px 0px 8px', borderRadius: '25px' }}>
            <Autocomplete options={[{'label': 'aaaa'}]} renderInput={(params) => 
              <div ref={params.InputProps.ref}>
                <InputBase {...params.inputProps} style={{borderRadius: '25px', border: '2px solid #000', padding: '10px', marginBottom: '8px', marginTop: '8px' }} placeholder="Seach" fullWidth/>
              </div>}
            />
          </Box>
        </div>
        <div style={{paddingBottom: '40px', color:'black', width: '80%', textAlign: 'center', padding: '0px 16px 32px 16px'}}>
          <Box sx={{ bgcolor: '#454c5a', display: 'block' }} style={{padding: '0px 8px 0px 8px', borderRadius: '25px' }}>
            Sets:
          </Box>
        </div>
        <Grid container spacing={3} style={{width: '80%'}}>
          {sets && sets.map((set) =>
            <Grid item xs key={set.id} style={{minWidth: '400px'}}>
              <SetsTile value={set}/> 
              <br/>
            </Grid>
          )}
        </Grid>
      </header>
    </Box>
  );
}

export default Sets;
