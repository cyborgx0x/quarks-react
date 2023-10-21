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
      const button = <Button icon={<OpenRegular />}>Open</Button>;
      const title = `Xem chi tiết`;
      const children = <TemplateDetail item={item} />;
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
  createTableColumn<Template>({
    columnId: "actions",
    renderHeaderCell: () => {
      return "Hành động khác";
    },
    renderCell: (item) => {
      const editButton = <Button icon={<EditRegular />}>Edit</Button>;
      const editTitle = `Chỉnh sửa`;
      const [updateTemplate, setUpdateTemplate] = useState<Template>(item)
      const editChildren = <TemplateEdit item={item} updateState={setUpdateTemplate}/>;
      const onClick = () => {
        const token = localStorage.getItem("access_token")

        let data = JSON.stringify(updateTemplate);
        
        let config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: `http://localhost:8000//api/user/templates/${item.id}/`,
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          data : data
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

export default function TemplateList(): ReactElement {
  const [items, setItems] = useState<Template[]>([]);
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
