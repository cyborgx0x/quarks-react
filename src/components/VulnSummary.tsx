import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function VulnerabilityTable() {
    const stt = [1, 2, 3, 4, 5, 6, 7];
    const diemYeu = [
        'SQL injection',
        'Sensitive data exposed',
        'Broken Authentication',
        'Directory listings',
        'Reflected XSS',
        'Không có cơ chế chống bruteforce',
        'Enums Usernames'
    ];
    const mucDo = ['Critical', 'High', 'High', 'Medium', 'Medium', 'Medium', 'Low'];
    const khuyenNghi = [
        'Thực hiện truy vấn SQL an toàn qua ORM hoặc prepared statement.',
        'Từ chối tất cả quyền truy cập vào file chứa thông tin nhạy cảm.',
        'Xây dựng lại cơ chế quản lý cookie, session.',
        'Từ chối tất cả quyền truy cập vào các thư mục nhạy cảm.',
        'Xây dựng bộ lọc XSS tốt hơn.',
        'Xây dựng cơ chế chống brute force.',
        'Trả về thông báo chung. Nên sử dụng captcha sau 3 lần đăng nhập sai'
    ];
    const ghiChu = [
        'Trạng thái: Open - CVSS: 9.9',
        'Trạng thái: Open - CVSS: 8.0',
        'Trạng thái: Open - CVSS: 8.0',
        'Trạng thái: Open - CVSS: 6.0',
        'Trạng thái: Open - CVSS: 4.0',
        'Trạng thái: Open - CVSS: 4.0',
        'Trạng thái: Open - CVSS: 3.0'
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
                    {stt.map((item, index) => (
                        <TableRow key={item}>
                            <TableCell>{item}</TableCell>
                            <TableCell>{diemYeu[index]}</TableCell>
                            <TableCell>{mucDo[index]}</TableCell>
                            <TableCell>{khuyenNghi[index]}</TableCell>
                            <TableCell>{ghiChu[index]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}