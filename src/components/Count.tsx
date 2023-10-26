import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { TemplateInfo } from '../type';

export default function VulnerabilityCountTable({ vulnerabilities }: { vulnerabilities: TemplateInfo[] }) {
  const vulnerabilityCounts = [
    { level: 'Critical', count: vulnerabilities.filter(item => item.info.severity === "critical").length },
    { level: 'High', count: vulnerabilities.filter(item => item.info.severity === "high").length },
    { level: 'Medium', count: vulnerabilities.filter(item => item.info.severity === "medium").length },
    { level: 'Low', count: vulnerabilities.filter(item => item.info.severity === "info").length }
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