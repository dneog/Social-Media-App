import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
const Loading= ()=> {
    return (
        
              <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
   
    <CircularProgress color="primary" className='loads'  />
      
    </Stack>
       
    )
}

export default Loading