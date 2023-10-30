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
    const tableStyle = { width: "100%", border: " 1px solid black", borderCollapse: "collapse" }
    const rowStyle = { border: "1px solid black", padding: "8px" }
    return (
        <table style={tableStyle}>
            <thead>
                <tr style={rowStyle}>
                    <th style={rowStyle}>Từ viết tắt</th>
                    <th style={rowStyle}>Mô tả</th>
                </tr>
            </thead>
            <tbody>
                {abbreviations.map((item) => (
                    <tr key={item.abbreviation} style={rowStyle}>
                        <td style={rowStyle}>{item.abbreviation}</td>
                        <td style={rowStyle}>{item.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}