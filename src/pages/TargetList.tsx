import { ReactElement, useEffect, useState } from "react";
import { APIResponse, AxiosConfig, Target } from "../type";
import axios from "axios";

import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  LargeTitle,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Body1Strong,
  TableColumnDefinition,
  createTableColumn,
  Button,
} from "@fluentui/react-components";
import {
  DeleteRegular,
  EditRegular,
  FormNewRegular,
  OpenRegular,
  CloudArrowUpRegular,
  ShareRegular,
  SaveRegular,
} from "@fluentui/react-icons";
import DialogComponent from "../components/DialogRegular";
import TargetCreate from "./target/TargetCreate";
import TargetDetail from "./target/TargetDetail";
import TargetEdit from "./target/TargetEdit";

const columns: TableColumnDefinition<Target>[] = [
  createTableColumn<Target>({
    columnId: "url",
    renderHeaderCell: () => {
      return "Đường dẫn";
    },
    renderCell: (item) => {
      return item.url;
    },
  }),
  createTableColumn<Target>({
    columnId: "last_scan",
    renderHeaderCell: () => {
      return "Lần cuối quét";
    },
    renderCell: (item) => {
      const date = new Date(item.last_scan);
      const formattedDate = date.toLocaleString();
      return formattedDate;
    },
  }),
  createTableColumn<Target>({
    columnId: "org",
    renderHeaderCell: () => {
      return "Tổ chức";
    },
    renderCell: (item) => {
      return item.org;
    },
  }),
  createTableColumn<Target>({
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
  createTableColumn<Target>({
    columnId: "singleAction",
    renderHeaderCell: () => {
      return "Single action";
    },
    renderCell: (item) => {
      const button = <Button icon={<OpenRegular />} onClick={() => setOpen(true)}>Open</Button>;
      const title = `Xem chi tiết`;
      const children = <TargetDetail item={item} />;
      const [open, setOpen] = useState<boolean>(false)
      const action = (
        <Button appearance="primary" icon={<ShareRegular />}>
          Share
        </Button>
      );
      return (
        <DialogComponent
          open={open}
          setopen={setOpen}
          buttonTitle={button}
          title={title}
          children={children}
          action={action}
        />
      );
    },
  }),
  createTableColumn<Target>({
    columnId: "actions",
    renderHeaderCell: () => {
      return "Actions";
    },
    renderCell: (item): ReactElement => {
      const sendDelete = () => {
        const token = localStorage.getItem("access_token")
        const config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: `http://localhost:8000/api/user/targets/${item.id}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        };

        axios.request(config)
          .then((response) => {
            setOpen(false)
            window.location.reload()
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            setOpen(false)
            console.log(error);
          });
      }
      const [open, setOpen] = useState<boolean>(false)
      const editButton = <Button icon={<EditRegular />} onClick={() => setOpen(true)}>Edit</Button>;
      const editTitle = `Chỉnh sửa`;
      const editChildren = <TargetEdit item={item} />;
      const editAction = (
        <Button appearance="primary" icon={<SaveRegular />} >
          Save
        </Button>
      );
      const editDialog = (
        <DialogComponent
          open={open}
          setopen={setOpen}
          buttonTitle={editButton}
          title={editTitle}
          children={editChildren}
          action={editAction}
        />
      );
      const [open2, setOpen2] = useState<boolean>(false)
      const deleteButton = <Button icon={<DeleteRegular />} onClick={() => setOpen2(true)}>Xóa</Button>;
      const deleteTitle = `Thực hiện xóa?`;
      const deleteChildren = <>Bạn có muốn xóa {item.url} không?</>;
      const deleteAction = (
        <Button appearance="primary" icon={<DeleteRegular />} onClick={() => sendDelete()}>
          Xóa
        </Button>
      );
      const deleteDialog = (
        <DialogComponent
          open={open2}
          setopen={setOpen2}
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
export default function TargetList(): ReactElement {
  const [items, setItems] = useState<Target[]>([]);
  const token = localStorage.getItem("access_token");
  const config: AxiosConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_HOST_URL}/api/user/targets/`,

    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getData = (): void => {
    axios(config)
      .then((response: { data: APIResponse }) => {
        setItems(response.data.results as Target[]);
      })
      .catch((error: { error: Target }) => {
        console.log(error);
      });
  };
  useEffect(() => getData(), []);
  const [open, setOpen] = useState<boolean>(false)

  const createButton = (
    <Button
      icon={<FormNewRegular />}
      appearance="primary"
      style={{ marginRight: "8vh" }}
      onClick={() => setOpen(true)}
    >
      Tạo mục tiêu mới
    </Button>
  );
  const [URL, setURL] = useState<string>("")
  const [Org, setOrg] = useState<string>("")

  const createTitle = `Tạo mục tiêu`;
  const createChildren = <TargetCreate setOrg={setOrg} setURL={setURL} />;
  const onClick = () => {
    const token = localStorage.getItem("access_token")

    const data = JSON.stringify({
      url: URL,
      org: Org
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://localhost:8000/api/user/targets/`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setOpen(false)
        getData()
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        setOpen(false)
        console.log(error);
      });

  };
  const createAction = (
    <Button appearance="primary" icon={<FormNewRegular />} onClick={onClick}>
      Tạo mới
    </Button>
  );
  const createDialog = (
    <DialogComponent
      setopen={setOpen}
      open={open}
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
        <LargeTitle>Targets</LargeTitle>
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
        <Body1Strong>Danh sách các mục tiêu</Body1Strong>
        <div>
          <Button
            icon={<CloudArrowUpRegular />}
            appearance="secondary"
            style={{ marginRight: "1vh" }}
          >
            Nhập mục tiêu
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
        <DataGridBody<Target>>
          {({ item, rowId }) => (
            <DataGridRow<Target> key={rowId}>
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
