import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function BarLoader() {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500', }} className='barLoader' spacing={2}>
     
      <LinearProgress color="info" sx={{ height: '4.5px', borderRadius: '5px 5px 0px 0px ' }} />
      
    </Stack>
  );
}