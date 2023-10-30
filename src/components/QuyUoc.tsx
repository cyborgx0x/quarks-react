
export default function QuyUoc() {
    const vulnerabilities = [
        { id: '#', weakness: 'Giải thích về lỗ hổng, điểm yếu tìm thấy trong quá trình kiểm thử', severity: 'Critical', recommendation: 'Đề xuất giải pháp khắc phục lỗ hổng', note: 'Trạng thái lỗ hổng\nĐiểm CVSS' },
        { id: '', weakness: '', severity: 'High', recommendation: 'Đề xuất giải pháp khắc phục lỗ hổng' },
        { id: '', weakness: '', severity: 'Medium', recommendation: 'Đề xuất giải pháp khắc phục lỗ hổng' },
        { id: '', weakness: '', severity: 'Low', recommendation: 'Đề xuất giải pháp khắc phục lỗ hổng' },
        { id: '', weakness: '', severity: 'Info', recommendation: 'Đề xuất giải pháp khắc phục lỗ hổng' }
    ];
    const tableStyle = { width: "100%", border: " 1px solid black", borderCollapse: "collapse" }
    const rowStyle = { border: "1px solid black", padding: "8px" }
    return (
        <table style={tableStyle}>
            <tr >
                <th style={rowStyle}>STT</th>
                <th style={rowStyle}>Điểm yếu</th>
                <th style={rowStyle}>Mức độ</th>
                <th style={rowStyle}>Khuyến nghị</th>
                <th style={rowStyle} >Ghi chú</th>
            </tr>
            <tbody style={rowStyle}>
                {vulnerabilities.map((item) => (
                    <tr key={item.id} style={rowStyle}>
                        <td style={rowStyle}>{item.id}</td>
                        <td style={rowStyle}>{item.weakness}</td>
                        <td style={rowStyle} >{item.severity}</td>
                        <td style={rowStyle}>{item.recommendation}</td>
                        <td style={rowStyle} >{item.note}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}