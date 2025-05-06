import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';
import { exchangeRates } from '../Component/exchangeRates';

const columns = [
  { width: 60, label: 'Month', dataKey: 'month' },
  { width: 130, label: 'Principal', dataKey: 'principal' },
  { width: 130, label: 'Interest', dataKey: 'interest' },
  { width: 160, label: 'Remaining Balance', dataKey: 'balance' },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent(currency) {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="left"
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper', fontWeight: 'bold' }}
        >
          {column.label} {column.dataKey !== 'month' ? `(${currency})` : ''}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function AmortizationTable({ amortizationData, currency }) {
  const [rate, setRate] = React.useState(1);

  React.useEffect(() => {
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

  const rowContent = (_index, row) => (
    <>
      {columns.map((column) => {
        const value = row[column.dataKey];
        return (
          <TableCell key={column.dataKey} align="left">
            {column.dataKey === 'month'
              ? value
              : `${(parseFloat(value) * rate).toFixed(2)} ${currency}`}
          </TableCell>
        );
      })}
    </>
  );

  return (
    <Paper style={{ height: 500, width: '100%' }}>
      <TableVirtuoso
        data={amortizationData}
        components={VirtuosoTableComponents}
        fixedHeaderContent={() => fixedHeaderContent(currency)}
        itemContent={rowContent}
      />
    </Paper>
  );
}
