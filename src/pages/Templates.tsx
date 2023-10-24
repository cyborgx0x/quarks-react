import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  LargeTitle,
  TableColumnDefinition,
  createTableColumn,
  Button,
  Body1Strong,
  SplitButton,
} from "@fluentui/react-components";
import { AxiosConfig, Template, APIResponse } from "../type";
import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
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
import TemplateDetail from "./template/TemplateDetail";
import TemplateEdit from "./template/TemplateEdit";
import TemplateCreate from "./template/TemplateCreate";

const columns: TableColumnDefinition<Template>[] = [
  createTableColumn<Template>({
    columnId: "name",
    renderHeaderCell: () => {
      return "Name";
    },
    compare: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    renderCell: (item) => {
      return item.name;
    },
  }),
  createTableColumn<Template>({
    columnId: "author",
    renderHeaderCell: () => {
      return "Author";
    },
    compare: (a, b) => {
      return a.author.localeCompare(b.author);
    },
    renderCell: (item) => {
      return item.author;
    },
  }),
  createTableColumn<Template>({
    columnId: "tag",
    renderHeaderCell: () => {
      return "Tag";
    },
    renderCell: (item) => {
      return item.tag;
    },
  }),
  createTableColumn<Template>({
    columnId: "severity",
    renderHeaderCell: () => {
      return "Severity";
    },
    renderCell: (item) => {
      return item.severity;
    },
  }),
  createTableColumn<Template>({
    columnId: "desc",
    renderHeaderCell: () => {
      return "Mô tả";
    },
    renderCell: (item) => {
      return item.desc.slice(0, 100) + "...";
    },
  }),
  createTableColumn<Template>({
    columnId: "lastUpdated",
    renderHeaderCell: () => {
      return "Last updated";
    },
    compare: (a, b) => {
      const aItem = new Date(a.modified_at);
      const bItem = new Date(b.modified_at);
      const diff = aItem.getTime() - bItem.getTime();
      return diff;
    },
    renderCell: (item) => {
      const date = new Date(item.modified_at);
      const formattedDate = date.toLocaleString();
      return formattedDate;
    },
  }),
  createTableColumn<Template>({
    columnId: "singleAction",
    renderHeaderCell: () => {
      return "Xem Chi Tiết";
    },
    renderCell: (item) => {
      const [open, setOpen] = useState<boolean>(false)
      const button = <Button icon={<OpenRegular />} onClick={() => setOpen(true)}>Open</Button>;
      const title = `Xem chi tiết`;
      const children = <TemplateDetail item={item} />;

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
  createTableColumn<Template>({
    columnId: "actions",
    renderHeaderCell: () => {
      return "Hành động khác";
    },
    renderCell: (item) => {
      const editTitle = `Chỉnh sửa`;
      const [updateTemplate, setUpdateTemplate] = useState<Template>(item)
      const [open, setOpen] = useState<boolean>(false)
      const [open2, setOpen2] = useState<boolean>(false)
      const editButton = <Button icon={<EditRegular />} onClick={() => setOpen(true)}>Edit</Button>;
      const editChildren = <TemplateEdit item={item} updateState={setUpdateTemplate} />;
      const onClick = () => {
        const token = localStorage.getItem("access_token")

        const data = JSON.stringify(updateTemplate);

        const config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: `http://localhost:8000/api/user/templates/${item.id}/`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          data: data
        };

        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });

      };

      const primaryActionButtonProps = {
        onClick,
      };
      const editAction = (
        <SplitButton appearance="primary" icon={<SaveRegular />} primaryActionButton={primaryActionButtonProps}>
          Save
        </SplitButton>
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
      const sendDelete = () => {
        const token = localStorage.getItem("access_token")
        const config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: `http://localhost:8000/api/user/templates/${item.id}`,
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
      const deleteButton = <Button icon={<DeleteRegular />} onClick={() => setOpen2(true)}>Xóa</Button>;
      const deleteTitle = `Thực hiện xóa?`;
      const deleteChildren = <>Bạn có muốn xóa {item.name} không?</>;
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

export default function TemplateList(): ReactElement {
  const [items, setItems] = useState<Template[]>([]);
  const [open, setOpen] = useState<boolean>(false)
  const token = localStorage.getItem("access_token");
  const config: AxiosConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_HOST_URL}/api/user/templates/`,

    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getData = (): void => {
    axios(config)
      .then((response: { data: APIResponse }) => {
        setItems(response.data.results as Template[]);
      })
      .catch((error: { error: Template }) => {
        console.log(error);
      });
  };
  useEffect(() => getData(), []);
  const createButton = (
    <Button
      icon={<FormNewRegular />}
      appearance="primary"
      style={{ marginRight: "8vh" }}
      onClick={() => setOpen(true)}
    >
      Tạo Template Mới
    </Button>
  );
  const createTitle = `Tạo Template mới`;
  const createChildren = <TemplateCreate />;
  const createAction = (
    <Button appearance="primary" icon={<FormNewRegular />}>
      Tạo mới
    </Button>
  );
  const createDialog = (
    <DialogComponent
      open={open}
      setopen={setOpen}
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
        <LargeTitle>Templates</LargeTitle>
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
        <Body1Strong>Danh sách các Template</Body1Strong>
        <div>
          <Button
            icon={<CloudArrowUpRegular />}
            appearance="secondary"
            style={{ marginRight: "1vh" }}
          >
            Import Templates
          </Button>
          {createDialog}
        </div>
      </div>
      <DataGrid
        selectionMode="multiselect"
        items={items}
        columns={columns}
        focusMode="composite"
        sortable
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Template>>
          {({ item, rowId }) => (
            <DataGridRow<Template> key={rowId}>
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
