import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { TemplateInfo } from '../type';

export default function VulnerabilityDetailsTable({ vulnerabilities }: { vulnerabilities: TemplateInfo[] }) {


    return (
        <div>
            {vulnerabilities.map((item) => (
                <div key={item.info.name}>
                    <h2>{item.info.name}</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Mô tả</TableCell>
                                    <TableCell>{item.info.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tác động của lỗ hổng</TableCell>
                                    <TableCell>{item.info.severity}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Domain/Url</TableCell>
                                    <TableCell>{item.host}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>References</TableCell>
                                    <TableCell>{item.info.reference}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Request</TableCell>
                                    <TableCell>{item.request}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Response</TableCell>
                                    <TableCell>{item.response}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>POC</TableCell>
                                    <TableCell>{item['matched-at'] && item['matched-at']}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            ))}
        </div>
    );
}