const data = [
  {
    name: "Bach Truong An",
    position: "Pentester",
    email: "backtruongan@company.com"
  },
  {
    name: "Do Xuan Bang",
    position: "Pentester",
    email: "doxuanbang@company.com"
  }
];

export default function PeopleTable() {
  const tableStyle = { width: "100%", border: " 1px solid black", borderCollapse: "collapse" }
  const rowStyle = { border: "1px solid black", padding: "8px" }
  return (
    <table style={tableStyle}>
      <tr>
        <th style={rowStyle}>Họ tên</th>
        <th style={rowStyle}>Email</th>
        <th style={rowStyle}>Vị trí</th>
      </tr>

      {data.map((row) => (
        <tr>
          <td style={rowStyle}>
            {row.name}
          </td>
          <td style={rowStyle}>
            {row.email}
          </td>
          <td style={rowStyle}>
            {row.position}
          </td>
        </tr>

      ))}

    </table>
  );
}