import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const data = [
  {
    name: "Bach Truong An",
    position: "Pentester",
    email: "backtruongan@company.com"
  },
  {
    name: "Do Xuan Bang",
    position: "Pentester",
    email: "doxuanbang@company.com"
  }
];

export default function PeopleTable() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Họ và tên</TableCell>
            <TableCell>Chức vụ</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}