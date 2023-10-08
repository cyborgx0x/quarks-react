import {
  // Input,
  Title3,
  LargeTitle,
  createTableColumn,
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridBody,
  DataGridCell,
  Button,
} from "@fluentui/react-components";
// import { Link24Regular, Add24Regular } from "@fluentui/react-icons";


import type {  TableColumnDefinition } from "@fluentui/react-components";

import { APIResponse, AxiosConfig, ScanProfile } from "../type";
import { useEffect, useState } from "react";
import axios from "axios";
import { DeleteRegular, EditRegular, OpenRegular } from "@fluentui/react-icons";


const columns: TableColumnDefinition<ScanProfile>[] = [
  createTableColumn<ScanProfile>({
    columnId: "name",
    renderHeaderCell: () => {
      return "Name";
    },
    renderCell: (item) => {
      return item.name;
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "filter",
    renderHeaderCell: () => {
      return "filter";
    },
    renderCell: (item) => {
      return item.filter;
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "output",
    renderHeaderCell: () => {
      return "output";
    },
    renderCell: (item) => {
      return item.output;
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "configuration",
    renderHeaderCell: () => {
      return "configuration";
    },
    renderCell: (item) => {
      return item.configuration;
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "lastUpdated",
    renderHeaderCell: () => {
      return "Last updated";
    },

    renderCell: (item) => {
      const date = new Date(item.modified_at);
      const formattedDate = date.toLocaleString();
      return formattedDate;
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "singleAction",
    renderHeaderCell: () => {
      return "Single action";
    },
    renderCell: () => {
      
      return <Button icon={<OpenRegular />}>Open</Button>;
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "actions",
    renderHeaderCell: () => {
      return "Actions";
    },
    renderCell: () => {
      return (
        <>
          <Button aria-label="Edit" icon={<EditRegular />} />
          <Button aria-label="Delete" icon={<DeleteRegular />} />
        </>
      );
    },
  }),
];


export default function ScanProfiles() {


  const [items, setItems] = useState<ScanProfile[]>([]);
  const token = localStorage.getItem("access_token");
  const config: AxiosConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_HOST_URL}/api/user/scan_profiles/`,

    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getData = (): void => {
    axios(config)
      .then((response: { data: APIResponse }) => {
        setItems(response.data.results as ScanProfile[]);
      })
      .catch((error: { error: ScanProfile }) => {
        console.log(error);
      });
  }
  useEffect(
    () => getData(), []
  )
  return (

    <>
      <LargeTitle>
        Scan Profiles
      </LargeTitle>
      <Title3>
        Danh sách các Profile phục vụ Scan
      </Title3>
      <DataGrid
        selectionMode="multiselect"
        items={items}
        columns={columns}
        focusMode="composite"
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<ScanProfile>>
          {({ item, rowId }) => (
            <DataGridRow<ScanProfile> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>

    </>


  );
}
