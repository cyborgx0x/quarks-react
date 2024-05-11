import { TemplateInfo } from '../type';

export default function VulnerabilityDetailsTable({ vulnerabilities }: { vulnerabilities: TemplateInfo[] }) {
    const tableStyle = { width: "100%", border: " 1px solid black"}
    const rowStyle = { border: "1px solid black", padding: "8px" }

    return (
        <div>
            {vulnerabilities.map((item) => (
                <div key={item.info.name}>
                    <h2>{item.info.name}</h2>
                    <table style={tableStyle}>
                        <tbody>
                            <tr style={rowStyle}>
                                <th style={rowStyle}>Mô tả</th>
                                <td style={rowStyle}>{item.info.description}</td>
                            </tr>
                            <tr style={rowStyle}>
                                <th style={rowStyle}>Tác động của lỗ hổng</th>
                                <td style={rowStyle}>{item.info.severity}</td>
                            </tr>
                            <tr style={rowStyle}>
                                <th style={rowStyle}>Domain/Url</th>
                                <td style={rowStyle}>{item.host}</td>
                            </tr>
                            {item.recommendation &&
                                <tr style={rowStyle}>
                                    <th style={rowStyle}>Khuyến nghị</th>
                                    <td style={rowStyle}>{item.recommendation}</td>
                                </tr>

                            }
                            <tr style={rowStyle}>
                                <th style={rowStyle}>References</th>
                                <td style={rowStyle}>{item.info.reference}</td>
                            </tr>
                            <tr style={rowStyle}>
                                <th style={rowStyle}>Request</th>
                                <td style={rowStyle}>{item.request}</td>
                            </tr>
                            <tr style={rowStyle}>
                                <th style={rowStyle}>Response</th>
                                <td style={rowStyle}>{item.response}</td>
                            </tr>
                            <tr style={rowStyle}>
                                <th style={rowStyle}>POC</th>
                                <td style={rowStyle}>{item['matched-at'] && item['matched-at']}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}