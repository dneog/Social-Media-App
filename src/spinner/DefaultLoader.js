import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
const DefaultLoader= ()=> {
    return (
        
              <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
   
    <CircularProgress color="primary" className='defaultLoad'  />
      
    </Stack>
       
    )
}

export default DefaultLoader