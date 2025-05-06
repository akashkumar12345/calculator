import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const EMIResult = ({ emi }) => {
  return (
    // <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Monthly EMI: ${emi.toFixed(2)}
      </Typography>
    // </Paper>
  );
};

export default EMIResult;
