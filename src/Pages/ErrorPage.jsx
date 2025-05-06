import React from 'react';
import { Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function ErrorPage() {
  const navigate = useNavigate(); // Using useNavigate to navigate

  const handleGoHome = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100vh',
        backgroundColor: '#121212',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Grid item>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Something went wrong in the application.
        </Typography>
      </Grid>
      {/* <Grid item>
        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
          The page you are looking for is unavailable.
        </Typography>
      </Grid> */}
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{ color: 'white', backgroundColor: '#1976d2' }}
        >
          Go to Home
        </Button>
      </Grid>
    </Grid>
  );
}
