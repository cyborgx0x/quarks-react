import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function AbbreviationTable() {
    const abbreviations = [
        { abbreviation: '2FA', description: 'Two Factor Authentication' },
        { abbreviation: 'API', description: 'Application Programming Interface' },
        { abbreviation: 'C2', description: 'Command and Control' },
        { abbreviation: 'CSRF', description: 'Cross Site Request Forgery' },
        { abbreviation: 'DLP', description: 'Data Loss Prevention' },
        { abbreviation: 'IDS', description: 'Intrusion Detection System' },
        { abbreviation: 'IPS', description: 'Intrusion Prevention System' },
        { abbreviation: 'JS', description: 'JavaScript' },
        { abbreviation: 'OSINT', description: 'Open Source Threat Intelligence' },
        { abbreviation: 'OWASP', description: 'Open Web Application Security Project' },
        { abbreviation: 'SDLC', description: 'Software Development Life Cycle' },
        { abbreviation: 'SIEM', description: 'Security Information and Event Management' },
        { abbreviation: 'SOC', description: 'Security Operation Center' },
        { abbreviation: 'SQLi', description: 'SQL Injection' },
        { abbreviation: 'WAF', description: 'Web Application Firewall' },
        { abbreviation: 'XSS', description: 'Cross Site Scripting' },
        { abbreviation: 'XML', description: 'XML External Entities' }
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Từ viết tắt</TableCell>
                        <TableCell>Mô tả</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {abbreviations.map((item) => (
                        <TableRow key={item.abbreviation}>
                            <TableCell>{item.abbreviation}</TableCell>
                            <TableCell>{item.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}