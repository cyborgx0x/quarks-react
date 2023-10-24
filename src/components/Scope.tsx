import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const data = [
  {
    type: "White Box",
    target: "http://testweb.com"
  },
  {
    type: "FULL SCAN",
    target: "http://adsweb.com"
  }
];

export default function ScopeTable() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Đánh giá</TableCell>
            <TableCell>Chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.type}>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.target}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}