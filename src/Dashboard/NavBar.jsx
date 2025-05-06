import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box,
  CssBaseline,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Navbar({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontWeightBold: 600,
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar sx={{ minHeight: 100 }}> {/* Increased height */}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Loan Calculator
          </Typography>

          <Box
            sx={{
              ml: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 3, // Increased spacing between entries
            }}
          >
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/exchange">
              Exchange Rates (Live)
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
            <Button color="inherit" component={Link} to="/error">
              Error
            </Button>
            <Switch checked={darkMode} onChange={handleThemeChange} />
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </ThemeProvider>
  );
}

export default Navbar;
