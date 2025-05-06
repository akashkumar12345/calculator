import React from 'react';
import { Typography, Grid, Container } from '@mui/material';
import CurrencyRatesTable from '../FormComponent/CurrencyRatesTable'; // Adjust the path if needed

export default function LiveRatesPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            // color="white"
            gutterBottom
          >
            Live Exchange Rates (Base: USD)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CurrencyRatesTable />
        </Grid>
      </Grid>
    </Container>
  );
}
