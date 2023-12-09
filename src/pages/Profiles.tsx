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
  Body1Stronger,
} from "@fluentui/react-components";
import axiosInstance from '../axiosConfig';
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

import { APIResponse, ScanProfile } from "../type";
import { useEffect, useState } from "react";

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
    columnId: "header",
    renderHeaderCell: () => {
      return "Custom Header";
    },
    renderCell: (item) => {
      return <div>
        {item.configuration &&
          item.configuration["-H"] &&
          <>
            {item.configuration["-H"].map(item => <div key={Math.random()}>{item}</div>)}
          </>
        }
      </div>
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "Option",
    renderHeaderCell: () => {
      return "Scan Option";
    },
    renderCell: (item) => {
      return <div>
        {item.configuration &&
          item.configuration.follow_redirects &&
          <>
            <Body1Stronger>follow_redirects</Body1Stronger>
            <div>

              {item.configuration.follow_redirects}
            </div>
          </>

        }
      </div>
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "tag",
    renderHeaderCell: () => {
      return "Tag Filter";
    },
    renderCell: (item) => {
      return <div>
        {item.configuration &&
          item.configuration["-tags"] &&
          <>
            {item.configuration["-tags"].map(item => <div key={Math.random()}>{item}</div>)}
          </>
        }
      </div>
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "author",
    renderHeaderCell: () => {
      return "Author Filter";
    },
    renderCell: (item) => {
      return <div>
        {item.configuration &&
          item.configuration["-a"] &&
          <>
            {item.configuration["-a"].map(item => <div key={Math.random()}>{item}</div>)}
          </>
        }
      </div>
    },
  }),
  createTableColumn<ScanProfile>({
    columnId: "idFiler",
    renderHeaderCell: () => {
      return "ID Filter";
    },
    renderCell: (item) => {
      return <div>
        {item.configuration &&
          item.configuration["-id"] &&
          <>
            {item.configuration["-id"].map(item => <div key={Math.random()}>{item}</div>)}
          </>
        }
      </div>
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
      const [open, setOpen] = useState<boolean>(false)
      const button = <Button icon={<OpenRegular />} onClick={() => setOpen(true)}>Open</Button>;
      const title = `Xem chi tiết`;
      const children = <ProfileDetail item={item} />;
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
  createTableColumn<ScanProfile>({
    columnId: "actions",
    renderHeaderCell: () => {
      return "Actions";
    },
    renderCell: (item) => {
      const [open, setOpen] = useState<boolean>(false)
      const [open2, setOpen2] = useState<boolean>(false)
      const editButton = <Button icon={<EditRegular />} onClick={() => setOpen(true)}>Edit</Button>;
      const editTitle = `Chỉnh sửa`;
      const [profileName, setProfileName] = useState<string>(item.name)
      const [profileDesc, setProfileDesc] = useState<string>(item.desc)
      const [header, setHeader] = useState<string[] | undefined>(item.configuration && item.configuration["-H"] || [])
      const [authorFilter, setAuthorFilter] = useState<string[] | undefined>(item.configuration && item.configuration["-a"] || [])
      const [tagFilter, setTagFilter] = useState<string[] | undefined>(item.configuration && item.configuration["-tags"] || [])
      const [idFilter, setIdFilter] = useState<string[] | undefined>(item.configuration && item.configuration["-id"] || [])

      const editChildren = <ProfileEdit profileName={profileName} profileDesc={profileDesc} header={header} authorFilter={authorFilter} tagFilter={tagFilter} idFilter={idFilter}
        setProfileName={setProfileName} setProfileDesc={setProfileDesc} setHeader={setHeader} setAuthorFilter={setAuthorFilter} setTagFilter={setTagFilter} setIdFilter={setIdFilter}
      />;
      const handleSaving = () => {
        const url = `/api/user/scan_profiles/${item.id}/`;
        const config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: url,
          data: {
            name: profileName,
            desc: profileDesc,
            configuration: {
              "-H": header,
              "-a": authorFilter,
              "-tags": tagFilter,
              "-id": idFilter
            }
          }
        };

        axiosInstance.request(config)
          .then((response) => {
            setOpen(false);
            window.location.reload();
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            setOpen(false);
            console.log(error);
          });
      }
      const editAction = (
        <Button appearance="primary" icon={<SaveRegular />} onClick={handleSaving}>
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
      const sendDelete = () => {
        const url = `/api/user/scan_profiles/${item.id}`;

        const config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: url,
        };

        axiosInstance.request(config)
          .then((response) => {
            setOpen(false);
            window.location.reload();
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            setOpen(false);
            console.log(error);
          });
      };

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

export default function ScanProfiles() {
  const [items, setItems] = useState<ScanProfile[]>([]);
  const getData = (): void => {
    const url = '/api/user/scan_profiles/';

    axiosInstance.get(url).then((response: { data: APIResponse }) => {
      setItems(response.data.results as ScanProfile[]);
    })
      .catch((error: { error: ScanProfile }) => {
        console.log(error);
      });
  };

  useEffect(() => getData(), []);
  const [header, setHeader] = useState<string[]>([])
  const [authorFilter, setAuthorFilter] = useState<string[]>([])
  const [tagFilter, setTagFilter] = useState<string[]>([])
  const [idFilter, setIdFilter] = useState<string[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [newProfile, setNewProfile] = useState<ScanProfile>({
    id: 1,
    name: '',
    desc: '',
    filter: {},
    output: {},
    configuration: {
      "-H": []
    },
    created_at: '',
    modified_at: '',
    option: {},
  })
  const createButton = (
    <Button
      icon={<FormNewRegular />}
      appearance="primary"
      style={{ marginRight: "8vh" }}
      onClick={() => setOpen(true)}
    >
      Tạo Profile Mới
    </Button>
  );
  const createTitle = `Tạo Profile mới`;
  const handleCreateScanProfile = () => {

    const oridata: ScanProfile = { ...newProfile, configuration: { "-H": header, "-a": authorFilter, "-id": idFilter, "-tags": tagFilter } };

    const url = '/api/user/scan_profiles/';

    axiosInstance.post(url, oridata
    )
      .then((response) => {
        setOpen(false);
        getData(); // Assuming getData is a function to fetch updated data
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        setOpen(false);
        console.log(error);
      });
  };

  const createChildren = <ProfileCreate
    newProfile={newProfile}
    setNewProfile={setNewProfile}
    header={header}
    setHeader={setHeader}
    authorFilter={authorFilter}
    setAuthorFilter={setAuthorFilter}
    tagFilter={tagFilter}
    setTagFilter={setTagFilter}
    idFilter={idFilter}
    setIdFilter={setIdFilter}
  />;
  const createAction = (
    <Button appearance="primary" icon={<FormNewRegular />} onClick={() => handleCreateScanProfile()}>
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
