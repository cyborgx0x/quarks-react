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
    const tableStyle = { width: "100%", border: " 1px solid black", borderCollapse: "collapse" }
    const rowStyle = { border: "1px solid black", padding: "8px" }
    return (
        <table style={tableStyle}>
            <thead>
                <tr style={rowStyle}>
                    <th style={rowStyle}>STT</th>
                    <th style={rowStyle}>Điểm yếu</th>
                    <th style={rowStyle}>Mức độ</th>
                    <th style={rowStyle}>Khuyến nghị</th>
                    <th style={rowStyle}>Ghi chú</th>
                </tr>
            </thead>
            <tbody>
                {stt.map((item, index) => (
                    <tr key={item} style={rowStyle}>
                        <td style={rowStyle}>{item}</td>
                        <td style={rowStyle}>{diemYeu[index]}</td>
                        <td style={rowStyle}>{mucDo[index]}</td>
                        <td style={rowStyle}>{khuyenNghi[index]}</td>
                        <td style={rowStyle}>{ghiChu[index]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}