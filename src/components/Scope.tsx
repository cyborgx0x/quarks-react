
import { Target } from '../type';

export default function ScopeTable({ targets }: { targets: Target[] }) {
  const tableStyle = { width: "100%", border: " 1px solid black", borderCollapse: "collapse" }
  const rowStyle = { border: "1px solid black", padding: "8px" }
  return (
    <table style={tableStyle}>
      <tr>
        <th style={rowStyle}>Tổ chức</th>
        <th style={rowStyle}>Đường dẫn</th>
      </tr>

      {targets.map((row) => (
        <tr>
          <td style={rowStyle}>
            {row.org}
          </td>
          <td style={rowStyle}>
            {row.url}
          </td>
        </tr>

      ))}

    </table>

  );
}