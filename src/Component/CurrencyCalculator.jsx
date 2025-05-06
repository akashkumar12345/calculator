import React, { useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import { exchangeRates } from "../Component/exchangeRates";

function CurrencyCalculator({ amount, currency, onCurrencyChange }) {
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const fetchRates = async () => {
      const data = await exchangeRates();
      if (data && data[currency]) {
        setRate(data[currency]);
      } else {
        setRate(1); // fallback
      }
    };

    fetchRates();
  }, [currency]);

  const converted = (amount * rate).toFixed(2);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }} // Responsive direction
      alignItems="center"
      gap={2}
    >
      <FormControl fullWidth sx={{ maxWidth: 200 }}>
        <InputLabel>Currency</InputLabel>
        <Select
          value={currency}
          onChange={onCurrencyChange}
          label="Currency"
          sx={{
            color: "white",
            backgroundColor: "#424242",
            "& .MuiSvgIcon-root": { color: "white" },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#333",
                color: "white",
              },
            },
          }}
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="INR">INR</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
          <MenuItem value="JPY">JPY</MenuItem>
          <MenuItem value="AUD">AUD</MenuItem>
          <MenuItem value="CAD">CAD</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
        Converted EMI: {converted} {currency}
      </Typography>
    </Box>
  );
}

export default CurrencyCalculator;
