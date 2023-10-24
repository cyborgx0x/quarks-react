import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function QuyUoc() {
    const vulnerabilities = [
        { id: '#', weakness: 'Giải thích về lỗ hổng, điểm yếu tìm thấy trong quá trình kiểm thử', severity: 'Critical', recommendation: 'Đề xuất giải pháp khắc phục lỗ hổng', note: 'Trạng thái lỗ hổng\nĐiểm CVSS' },
        { id: '', weakness: '', severity: 'High', recommendation: 'Đề xuất giải pháp khắc phục lỗ hổng' },
        { id: '', weakness: '', severity: 'Medium', recommendation: 'Đề xuất giải pháp khắc phục lỗ hổng' },
        { id: '', weakness: '', severity: 'Low', recommendation: 'Đề xuất giải pháp khắc phục lỗ hổng' },
        { id: '', weakness: '', severity: 'Info', recommendation: 'Đề xuất giải pháp khắc phục lỗ hổng' }
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Điểm yếu</TableCell>
                        <TableCell>Mức độ</TableCell>
                        <TableCell>Khuyến nghị</TableCell>
                        <TableCell>Ghi chú</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vulnerabilities.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.weakness}</TableCell>
                            <TableCell>{item.severity}</TableCell>
                            <TableCell>{item.recommendation}</TableCell>
                            <TableCell>{item.note}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}