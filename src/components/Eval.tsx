export default function VulnerabilitySeverityTable() {
    const severityLevels = [
        { level: 'Info', score: 'N/A', description: 'Không có sự tác động trực tiếp đến mục tiêu. Đây chỉ là thông tin cần chú ý liên quan đến mục tiêu tấn công trong quá trình kiểm thử.' },
        { level: 'Low', score: '0.1-3.9', description: 'Lỗ hổng ở mức độ này không thể khai thác được, tuy nhiên chúng vẫn có thể tiết lộ nhiều thông tin của tổ chức. Nên có kế hoạch giải quyết và bản vá cho những lỗ hổng này trong quá trình bảo trì.' },
        { level: 'Medium', score: '4.0-6.9', description: 'Lỗ hổng ở mức độ này vẫn tồn tại nhưng không thể khai thác triệt để hoặc yêu cầu thêm các bước như social engineering. Nên có kế hoạch giải quyết và bản vá cho các lỗ hổng này ngay sau khi các lỗ hổng ở mức high được giải quyết.' },
        { level: 'High', score: '7.0-8.9', description: 'Lỗ hổng ở mức độ này khai thác khó hơn, tuy nhiên vẫn có thể dẫn đến leo thang đặc quyền hay đánh mất dữ liệu. Nên có kế hoạch giải quyết cụ thể và bản vá cho lỗ hổng này càng sớm càng tốt.' },
        { level: 'Critical', score: '9.0-10', description: 'Lỗ hổng ở mức độ này có thể khai thác trực tiếp và thường để lại hậu quả ở cấp hệ thống. Nên có kế hoạch giải quyết cụ thể và bản vá cho lỗ hổng này ngay lập tức.' }
    ];
    const tableStyle = { width: "100%", border: " 1px solid black"}
    const rowStyle = { border: "1px solid black", padding: "8px" }
    return (
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th style={rowStyle}>Mức độ nghiêm trọng</th>
                    <th style={rowStyle}>Điểm CVSS</th>
                    <th style={rowStyle}>Mô tả</th>
                </tr>
            </thead>
            <tbody>
                {severityLevels.map((item) => (
                    <tr key={item.level}>
                        <td style={rowStyle}>{item.level}</td>
                        <td style={rowStyle}>{item.score}</td>
                        <td style={rowStyle}>{item.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}