import {
  // Input,
  Body1Strong,
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

import {
  DeleteRegular,
  EditRegular,
  OpenRegular,
  ShareRegular,
  FormNewRegular,
  CloudArrowUpRegular,
  SaveRegular,
} from "@fluentui/react-icons";
import DialogComponent from "../components/DialogRegular";

import type { TableColumnDefinition } from "@fluentui/react-components";

import { APIResponse, AxiosConfig, ScanProfile } from "../type";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCreate from "./profile/ProfileCreate";
import ProfileDetail from "./profile/ProfileDetail";
import ProfileEdit from "./profile/ProfileEdit";

const columns: TableColumnDefinition<ScanProfile>[] = [
  createTableColumn<ScanProfile>({
    columnId: "name",
    renderHeaderCell: () => {
      return "Tên Profile";
    },
    renderCell: (item) => {
      return item.name;
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "desc",
    renderHeaderCell: () => {
      return "Mô tả";
    },
    renderCell: (item) => {
      return item.desc;
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
    renderCell: (item) => {
      const button = <Button icon={<OpenRegular />}>Open</Button>;
      const title = `Xem chi tiết`;
      const children = <ProfileDetail item={item} />;
      const action = (
        <Button appearance="primary" icon={<ShareRegular />}>
          Share
        </Button>
      );
      return (
        <DialogComponent
          buttonTitle={button}
          title={title}
          children={children}
          action={action}
        />
      );
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "actions",
    renderHeaderCell: () => {
      return "Actions";
    },
    renderCell: (item) => {
      const editButton = <Button icon={<EditRegular />}>Edit</Button>;
      const editTitle = `Chỉnh sửa`;
      const editChildren = <ProfileEdit item={item} />;
      const editAction = (
        <Button appearance="primary" icon={<SaveRegular />}>
          Save
        </Button>
      );
      const editDialog = (
        <DialogComponent
          buttonTitle={editButton}
          title={editTitle}
          children={editChildren}
          action={editAction}
        />
      );

      const deleteButton = <Button icon={<DeleteRegular />}>Xóa</Button>;
      const deleteTitle = `Thực hiện xóa?`;
      const deleteChildren = <>Bạn có muốn xóa {item.name} không?</>;
      const deleteAction = (
        <Button appearance="primary" icon={<DeleteRegular />}>
          Xóa
        </Button>
      );
      const deleteDialog = (
        <DialogComponent
          buttonTitle={deleteButton}
          title={deleteTitle}
          children={deleteChildren}
          action={deleteAction}
        />
      );
      return (
        <>
          {editDialog}
          {deleteDialog}
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
  };
  useEffect(() => getData(), []);
  const createButton = (
    <Button
      icon={<FormNewRegular />}
      appearance="primary"
      style={{ marginRight: "8vh" }}
    >
      Tạo Profile Mới
    </Button>
  );
  const createTitle = `Tạo Profile mới`;
  const createChildren = <ProfileCreate />;
  const createAction = (
    <Button appearance="primary" icon={<FormNewRegular />}>
      Tạo mới
    </Button>
  );
  const createDialog = (
    <DialogComponent
      buttonTitle={createButton}
      title={createTitle}
      children={createChildren}
      action={createAction}
    />
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <LargeTitle>Scan Profiles</LargeTitle>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Body1Strong>Danh sách các Profile phục vụ Scan</Body1Strong>
        <div>
          <Button
            icon={<CloudArrowUpRegular />}
            appearance="secondary"
            style={{ marginRight: "1vh" }}
          >
            Phục hồi Profile
          </Button>
          {createDialog}
        </div>
      </div>

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
