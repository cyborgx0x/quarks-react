import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

export default function VulnerabilityDetailsTable() {
    const vulnerabilities = [
        {
            title: 'SQL Injection',
            description: 'Phát hiện lỗ hổng SQL Injection trong biểu mẫu đăng nhập, cho phép kẻ tấn công trích xuất dữ liệu từ cơ sở dữ liệu.',
            impact: 'Lỗ hổng này có thể dẫn đến việc truy cập dữ liệu không được ủy quyền, sửa đổi dữ liệu và có thể thực hiện các hoạt động quản trị trên cơ sở dữ liệu.',
            domainUrl: 'https://example.com/login',
            references: 'CWE-89 - Không xử lý đúng các phần tử đặc biệt được sử dụng trong một truy vấn SQL (\'SQL Injection\')',
            poc: '1. Truy cập trang đăng nhập tại https://example.com/login. 2. Trong trường tên người dùng hoặc mật khẩu, tiêm mã SQL độc hại để kiểm tra lỗ hổng.'
        },
        {
            title: 'Tiết lộ Dữ liệu Nhạy Cảm',
            description: 'Máy chủ tiết lộ thông tin nhạy cảm bằng cách cho phép liệt kê thư mục của thư mục .git.',
            impact: 'Việc này có thể dẫn đến tiết lộ mã nguồn và có thể gây ra các cuộc tấn công bảo mật khác.',
            domainUrl: 'https://example.com/.git',
            references: 'CWE-527: Tiết lộ Kho Lưu Trữ Kiểm Soát Phi Ủy Quyền cho Phiên Bản (Version-Control Repository) không Được Ủy Quyền (Unauthorized Control Sphere)',
            poc: '1. Truy cập thư mục .git bị tiết lộ tại https://example.com/.git. 2. Sử dụng các công cụ như git clone hoặc wget để tải mã nguồn.'
        },
        {
            title: 'Reflected XSS',
            description: 'Phát hiện lỗ hổng Cross-Site Scripting (XSS) phản ánh trong chức năng tải lên hình ảnh, cho phép kẻ tấn công thực thi mã JavaScript trên trình duyệt của nạn nhân.',
            impact: 'Khi người dùng nhập một payload vào cookie, trình duyệt tải trang web và thực thi bất kỳ mã nào được chèn, có thể tiết lộ thông tin của nạn nhân cho kẻ tấn công.',
            domainUrl: 'https://example.com/upload',
            references: 'CWE-79 - Không xử lý đúng đầu vào trong quá trình tạo trang web (\'Cross-site Scripting\')',
            poc: '1. Truy cập trang tải lên tại https://example.com/upload. 2. Tải lên một hình ảnh với mã độc hại như một phần của payload.'
        },
        {
            title: 'Bypass Authentication',
            description: 'Phát hiện lỗ hổng cho phép vượt qua xác thực tại trang quản trị, cho phép kẻ tấn công truy cập trái phép vào hệ thống quản trị.',
            impact: 'Kẻ tấn công có thể thực hiện các hoạt động không được ủy quyền và có quyền truy cập không thẩm quyền đối với các tính năng quản trị.',
            domainUrl: 'https://example.com/admin',
            references: 'CWE-284 - Không xử lý đúng việc xác thực và quyền truy cập (\'Authentication Bypass\')',
            poc: '1. Truy cập trang quản trị tại https://example.com/admin. 2. Sử dụng kỹ thuật lỗ hổng để truy cập quản trị hệ thống.'
        },
        {
            title: 'Cross-Site Request Forgery (CSRF)',
            description: 'Phát hiện lỗ hổng Cross-Site Request Forgery (CSRF) trong tính năng thay đổi mật khẩu, cho phép kẻ tấn công thay đổi mật khẩu của người dùng mà họ chọn.',
            impact: 'Khi người dùng được lừa đảo thực hiện hành động, họ có thể không ý muốn thay đổi mật khẩu của họ và đánh mất quyền kiểm soát trang web.',
            domainUrl: 'https://example.com/change-password',
            references: 'CWE-352 - CSRF không được kiểm soát (\'Uncontrolled CSRF\')',
            poc: '1. Truy cập tính năng thay đổi mật khẩu tại https://example.com/change-password. 2. Tự động thay đổi mật khẩu của người dùng khi họ thực hiện hành động không ý muốn.'
        }
    ];

    return (
        <div>
            {vulnerabilities.map((item) => (
                <div key={item.title}>
                    <h2>{item.title}</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Mô tả</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tác động của lỗ hổng</TableCell>
                                    <TableCell>{item.impact}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Domain/Url</TableCell>
                                    <TableCell>{item.domainUrl}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>References</TableCell>
                                    <TableCell>{item.references}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <p>
                        <b>POC:</b> {item.poc}
                    </p>
                </div>
            ))}
        </div>
    );
}