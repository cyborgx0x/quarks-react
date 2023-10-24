import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function VulnerabilitySeverityTable() {
    const severityLevels = [
        { level: 'Info', score: 'N/A', description: 'Không có sự tác động trực tiếp đến mục tiêu. Đây chỉ là thông tin cần chú ý liên quan đến mục tiêu tấn công trong quá trình kiểm thử.' },
        { level: 'Low', score: '0.1-3.9', description: 'Lỗ hổng ở mức độ này không thể khai thác được, tuy nhiên chúng vẫn có thể tiết lộ nhiều thông tin của tổ chức. Nên có kế hoạch giải quyết và bản vá cho những lỗ hổng này trong quá trình bảo trì.' },
        { level: 'Medium', score: '4.0-6.9', description: 'Lỗ hổng ở mức độ này vẫn tồn tại nhưng không thể khai thác triệt để hoặc yêu cầu thêm các bước như social engineering. Nên có kế hoạch giải quyết và bản vá cho các lỗ hổng này ngay sau khi các lỗ hổng ở mức high được giải quyết.' },
        { level: 'High', score: '7.0-8.9', description: 'Lỗ hổng ở mức độ này khai thác khó hơn, tuy nhiên vẫn có thể dẫn đến leo thang đặc quyền hay đánh mất dữ liệu. Nên có kế hoạch giải quyết cụ thể và bản vá cho lỗ hổng này càng sớm càng tốt.' },
        { level: 'Critical', score: '9.0-10', description: 'Lỗ hổng ở mức độ này có thể khai thác trực tiếp và thường để lại hậu quả ở cấp hệ thống. Nên có kế hoạch giải quyết cụ thể và bản vá cho lỗ hổng này ngay lập tức.' }
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Mức độ nghiêm trọng</TableCell>
                        <TableCell>Điểm CVSS</TableCell>
                        <TableCell>Mô tả</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {severityLevels.map((item) => (
                        <TableRow key={item.level}>
                            <TableCell>{item.level}</TableCell>
                            <TableCell>{item.score}</TableCell>
                            <TableCell>{item.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}