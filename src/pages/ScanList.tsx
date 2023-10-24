import {
  LargeTitle,
  shorthands,
  makeStyles,
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridBody,
  DataGridCell,
  createTableColumn,
  TableColumnDefinition,
  Button,
  Divider,
  Body1Strong,
  Dropdown,
  Option
} from "@fluentui/react-components";
import { ReactElement, useEffect, useState } from "react";
import { APIResponse, AxiosConfig, Scan, ScanProfile, Target } from "../type";
import axios from "axios";
import {
  DeleteRegular,
  OpenRegular,
  ArrowSyncRegular,
  MoreCircleRegular,
  ArrowExportRegular,
  PrintRegular,
  ScanRegular
} from "@fluentui/react-icons";
import CardScan from "../components/CardScan";
import ReportView from "./Report";
import DialogComponent from "../components/DialogRegular";
import { Select, useId } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    // Prevent the example from taking the full width of the page (optional)
    // maxWidth: "400px",
    // Stack the label above the field (with 2px gap per the design system)
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
  customLineStyle: {
    ...shorthands.borderWidth("2px"),
    "::before": {
      borderTopStyle: "dashed",
      borderTopWidth: "2px",
    },
    "::after": {
      borderTopStyle: "dashed",
      borderTopWidth: "2px",
    },
  },
});

const columns: TableColumnDefinition<Scan>[] = [
  createTableColumn<Scan>({
    columnId: "id",
    renderHeaderCell: () => {
      return "ID";
    },
    renderCell: (item) => {
      return item.id;
    },
  }),
  createTableColumn<Scan>({
    columnId: "result",
    renderHeaderCell: () => {
      return "Kết quả";
    },
    renderCell: (item) => {
      return item.result;
    },
  }),
  createTableColumn<Scan>({
    columnId: "profile",
    renderHeaderCell: () => {
      return "Profile quét";
    },
    renderCell: (item) => {
      return item.profile.id;
    },
  }),
  createTableColumn<Scan>({
    columnId: "created_at",
    renderHeaderCell: () => {
      return "Thời gian tạo";
    },
    renderCell: (item) => {
      return item.created_at;
    },
  }),
  createTableColumn<Scan>({
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
  createTableColumn<Scan>({
    columnId: "singleAction",
    renderHeaderCell: () => {
      return "Single action";
    },
    renderCell: () => {
      return <Button icon={<OpenRegular />}>Open</Button>;
    },
  }),
  createTableColumn<Scan>({
    columnId: "actions",
    renderHeaderCell: () => {
      return "Actions";
    },
    renderCell: () => {
      const button = <Button aria-label="Xuất báo cáo" icon={<ArrowExportRegular />} >Report</Button>
      const title = `Xuất Báo Cáo`;
      const [open, setOpen] = useState<boolean>(false)
      const children = <ReportView />;
      const action = (
        <Button appearance="primary" icon={<PrintRegular />}>
          In ra PDF
        </Button>
      );
      return (
        <>
          <DialogComponent
            open={open}
            setopen={setOpen}
            buttonTitle={button}
            title={title}
            children={children}
            action={action}
          />
          <Button aria-label="Delete" icon={<DeleteRegular />} />
        </>
      );
    },
  }),
];

export default function ScanList(): ReactElement {
  const [items, setItems] = useState<Scan[]>([]);
  const [targetList, setTargetList] = useState<Target[]>([{
    url: "example.com", id: 1, last_scan: '',
    org: '',
    created_at: "",
    modified_at: ""
  }]);
  const [profileList, setProfileList] = useState<ScanProfile[]>([{
    id: 1,
    name: '',
    desc: '',
    filter: '',
    output: '',
    configuration: '',
    created_at: '',
    modified_at: '',
    option: '',
  }]);
  const selectTarget = useId('multi-target');
  const selectProfile = useId();


  const token = localStorage.getItem("access_token");
  const config: AxiosConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_HOST_URL}/api/user/scans/`,

    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getData = (): void => {
    axios(config)
      .then((response: { data: APIResponse }) => {
        setItems(response.data.results as Scan[]);
      })
      .catch((error: { error: Scan }) => {
        console.log(error);
      });
  };
  const targetConfig: AxiosConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_HOST_URL}/api/user/targets/`,

    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getTarget = (): void => {
    axios(targetConfig)
      .then((response: { data: APIResponse }) => {
        setTargetList(response.data.results as Target[]);
      })
      .catch((error: { error: Target }) => {
        console.log(error);
      });
  };
  const profileConfig: AxiosConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_HOST_URL}/api/user/scan_profiles/`,

    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getProfile = (): void => {
    axios(profileConfig)
      .then((response: { data: APIResponse }) => {
        setProfileList(response.data.results as ScanProfile[]);
      })
      .catch((error: { error: ScanProfile }) => {
        console.log(error);
      });
  };
  useEffect(() => { getData(); getTarget(); getProfile() }, []);
  const styles = useStyles();
  const title = `Quét nâng cao`;
  const [open, setOpen] = useState<boolean>(false)
  const [target, setTarget] = useState<string[]>([])
  const [profile, setProfile] = useState<number>(1)
  useEffect(() => {
    setTarget([])
    setProfile(1)
  }, [open]);
  const children = (

    <>
      <label htmlFor={selectTarget}>Chọn Target</label>
      {targetList &&
        <Dropdown className={styles.root}
          aria-labelledby={selectTarget}
          multiselect={true}
          placeholder="Chọn một hoặc nhiều mục tiêu"
          onOptionSelect={(e, data) => setTarget(data.selectedOptions)}
        >
          {targetList.map((option) => (
            <Option key={option.id} value={option.id.toString()}>
              {option.url}
            </Option>
          ))}
        </Dropdown>

      }
      <Divider />
      <label htmlFor={selectProfile}>Chọn Profile</label>
      {profileList &&

        <Select defaultValue={profileList[0].id} id={selectProfile} onChange={e => setProfile(parseInt(e.target.value))}>
          {profileList.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}

        </Select>
      }

    </>

  );
  const handleAdvanceScan = () => {
    const token = localStorage.getItem("access_token")

    const data = JSON.stringify({
      profile: profile,
      targets: target.map(item => parseInt(item))
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://localhost:8000//api/user/scans/`,
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

  }
  const action = (
    <Button appearance="primary" icon={<ScanRegular />} onClick={() => handleAdvanceScan()}>
      Bắt đầu quét
    </Button>
  );
  const button = (<Button icon={<MoreCircleRegular />} appearance="secondary" onClick={() => setOpen(true)}>
    Quét nâng cao
  </Button>)

  return (
    <div className={styles.root}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <LargeTitle>Scans</LargeTitle>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "192px",
        }}
      >
        <Divider
          vertical
          alignContent="center"
          className={styles.customLineStyle}
        >
          <CardScan />
        </Divider>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          minHeight: "42px",
        }}
      >
        <Button icon={<ArrowSyncRegular />} appearance="subtle">
          Thay bằng Profile khác?
        </Button>
        <DialogComponent
          open={open}
          setopen={setOpen}
          buttonTitle={button}
          title={title}
          children={children}
          action={action}
        />
      </div>
      <Body1Strong>Danh sách các lượt quét</Body1Strong>
      <>
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
          <DataGridBody<Scan>>
            {({ item, rowId }) => (
              <DataGridRow<Scan> key={rowId}>
                {({ renderCell }) => (
                  <DataGridCell>{renderCell(item)}</DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </>
    </div>
  );
}
