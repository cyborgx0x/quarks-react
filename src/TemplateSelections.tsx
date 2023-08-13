import * as React from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  useTableFeatures,
  TableColumnDefinition,
  useTableSelection,
  createTableColumn,
} from "@fluentui/react-components";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: "CVE-2023-0099", icon: <DocumentRegular /> },
    author: { label: "r3Y3r53", status: "available" },
    lastUpdated: { label: "Simple URLs < 115 - Cross Site Scripting", timestamp: 3 },
    lastUpdate: {
      label: "You edited this",
      icon: <EditRegular />,
    },
  },
  {
    file: { label: "CVE-2023-0126", icon: <FolderRegular /> },
    author: { label: "tess", status: "busy" },
    lastUpdated: { label: "SonicWall SMA1000 LFI", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "CVE-2023-0236", icon: <VideoRegular /> },
    author: { label: "r3Y3r53", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "WordPress Tutor LMS <2.0.10 - Cross Site Scripting",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 1 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "file",
  }),
  createTableColumn<Item>({
    columnId: "author",
  }),
  createTableColumn<Item>({
    columnId: "lastUpdated",
  }),
  createTableColumn<Item>({
    columnId: "lastUpdate",
  }),
];

export const TemplateSelectionView = () => {
  const {
    getRows,
    selection: {
      allRowsSelected,
      someRowsSelected,
      toggleAllRows,
      toggleRow,
      isRowSelected,
    },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: "multiselect",
        defaultSelectedItems: new Set([0, 1]),
      }),
    ]
  );

  const rows = getRows((row) => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === " ") {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ("brand" as const) : ("none" as const),
    };
  });

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === " ") {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows]
  );

  return (
    <Table aria-label="Table with multiselect">
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={
              allRowsSelected ? true : someRowsSelected ? "mixed" : false
            }
            onClick={toggleAllRows}
            onKeyDown={toggleAllKeydown}
            checkboxIndicator={{ "aria-label": "Select all rows " }}
          />

          <TableHeaderCell>Template</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell
              checked={selected}
              checkboxIndicator={{ "aria-label": "Select row" }}
            />
            <TableCell>
              <TableCellLayout media={item.file.icon}>
                {item.file.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    badge={{ status: item.author.status }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>
                {item.lastUpdate.label}
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};