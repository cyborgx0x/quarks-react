import { TemplateInfo } from '../type';

export default function VulnerabilityCountTable({ vulnerabilities }: { vulnerabilities: TemplateInfo[] }) {
  const vulnerabilityCounts = [
    { level: 'Critical', count: vulnerabilities.filter(item => item.info.severity === "critical").length },
    { level: 'High', count: vulnerabilities.filter(item => item.info.severity === "high").length },
    { level: 'Medium', count: vulnerabilities.filter(item => item.info.severity === "medium").length },
    { level: 'Low', count: vulnerabilities.filter(item => item.info.severity === "info").length }
  ];
  const tableStyle = { width: "100%", border: " 1px solid black"}
  const rowStyle = { border: "1px solid black", padding: "8px" }
  return (
    <table style={tableStyle}>
      <thead>
        <tr style={rowStyle}>
          <th style={rowStyle}>Mức độ</th>
          <th style={rowStyle}>Số lượng lỗ hổng</th>
        </tr>
      </thead>
      <tbody>
        {vulnerabilityCounts.map((item) => (
          <tr key={item.level} style={rowStyle}>
            <td style={rowStyle}>{item.level}</td>
            <td style={rowStyle}>{item.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}