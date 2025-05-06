// src/LoanCalculator.js
import React, { useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import CustomTextArea from "../FormComponent/CustomTextArea";
import EMIResult from "../Component/EMIResult";
import CurrencyCalculator from "../Component/CurrencyCalculator";
import AmortizationTable from "../FormComponent/AmortizationTable";

function Dashboard() {
  const defaultData = {
    loanAmount: "",
    interestRate: "",
    termYears: "",
  };

  const [formData, setFormData] = useState(defaultData);
  const [emi, setEmi] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [amortizationData, setAmortizationData] = useState([]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

 const handleReset = () => {
    setEmi(null);
  }


  const handleCalculate = () => {
    const { loanAmount, interestRate, termYears } = formData;

    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(termYears) * 12;

    if (!P || !R || !N) return;

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue);

    // Generate amortization schedule
    let balance = P;
    const amortization = [];

    for (let i = 1; i <= N; i++) {
      const interest = balance * R;
      const principal = emiValue - interest;
      balance -= principal;

      amortization.push({
        month: i,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : "0.00",
      });
    }

    setAmortizationData(amortization);
  };


  const config = [
    {
      label: "Loan Amount",
      name: "loanAmount",
      type: "text",
      required: true,
      helperText: "",
      placeholder: "Loan Amount",
      errorMessage: "Required",
      pattern: "^[0-9]+$",
    },
    {
      label: "Interest Rate (%)",
      name: "interestRate",
      type: "text",
      required: true,
      helperText: "",
      placeholder: "Interest Rate",
      errorMessage: "Required",
      transformInput: (value) => value.replace(/[^0-9.]/g, ""),
      pattern: "^[0-9]+$",
    },
    {
      label: "Term (Years)",
      name: "termYears",
      type: "text",
      required: true,
      helperText: "",
      placeholder: "Term in Years",
      errorMessage: "Required",
      pattern: "^[0-9]+$",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="left">
        Loan Calculator Dashboard
      </Typography>

      {/* Inputs */}
      <Grid container spacing={2}>
        {config.map((field, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <CustomTextArea
              {...field}
              defaultValue={formData[field.name]}
              onchange={handleInputChange}
            />
          </Grid>
        ))}
      </Grid>

      {/* Calculate Button */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCalculate}
            sx={{
              fontWeight: "bold",
              backgroundColor: "#90CAF9",
              color: "black",
              "&:hover": {
                backgroundColor: "#64B5F6",
              },
            }}
          >
            CALCULATE
          </Button>
        </Grid>
      </Grid>

      {/* EMI & Currency Section */}
      {emi && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <EMIResult emi={emi} />
          </Grid>
        </Grid>
      )}

<Grid container spacing={2} sx={{ mt: 2, justifyContent: 'space-between' }}>
  {emi && (
    <Grid item xs={12} sm={6}>
      <CurrencyCalculator
        amount={emi}
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
      />
    </Grid>
  )}

  <Grid item xs={12} sm={3} container justifyContent="flex-end">
  {emi && (
    <Button
      variant="outlined"
      onClick={handleReset}  // Define handleReset function for reset logic
      sx={{ width: '100%', maxWidth: 150 }}  // For responsive button width
    >
      Reset
    </Button>
)}
  </Grid>
</Grid>


      <Grid container spacing={2} sx={{ mt: 4 }}>
  {emi && amortizationData.length > 0 && (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Amortization Schedule
      </Typography>
    </Grid>
  )}
</Grid>

<Grid>
  {emi && amortizationData.length > 0 && (
    <Grid item xs={12}>
      <AmortizationTable
        amortizationData={amortizationData}
        currency={currency}
      />
    </Grid>
  )}
</Grid>


    </Container>
  );
}

export default Dashboard;
