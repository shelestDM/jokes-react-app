import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
    <Stack direction="row" justifyContent='center'>
      <CircularProgress color="success" />
    </Stack>
    );
}
 
export default Loader;