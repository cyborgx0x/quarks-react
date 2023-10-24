import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function VulnerabilityCountTable() {
  const vulnerabilityCounts = [
    { level: 'Critical', count: 1 },
    { level: 'High', count: 2 },
    { level: 'Medium', count: 3 },
    { level: 'Low', count: 6 }
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mức độ</TableCell>
            <TableCell>Số lượng lỗ hổng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vulnerabilityCounts.map((item) => (
            <TableRow key={item.level}>
              <TableCell>{item.level}</TableCell>
              <TableCell>{item.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}