import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
const ProfileLoader= ()=> {
    return (
        
              <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
   
    <CircularProgress color="primary" size={160} thickness={2.4} sx={{height: '2px',}} className='profileLoad'  />
      
    </Stack>
       
    )
}

export default ProfileLoader