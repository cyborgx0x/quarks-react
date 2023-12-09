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
  Option,
  Text,
  Body1Stronger,
  Spinner
} from "@fluentui/react-components";
import { ReactElement, useEffect, useState } from "react";
import { APIResponse, Scan, ScanProfile, Target } from "../type";


import axiosInstance from '../axiosConfig';

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
import ScanDetailView from "./scan/ScanDetail";

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
      return "Thống kê";
    },
    renderCell: (item) => {
      if (item.result) {
        const { result } = item
        return (<div>
          <Body1Strong>Critical: {result.filter(item => item.info.severity === "critical").length}</Body1Strong>
          <Divider />
          <Body1Strong>High: {result.filter(item => item.info.severity === "high").length}</Body1Strong>
          <Divider />
          <Body1Strong>Medium: {result.filter(item => item.info.severity === "medium").length}</Body1Strong>
          <Divider />
          <Body1Strong>Info: {result.filter(item => item.info.severity === "info").length}</Body1Strong>
          <Divider />
        </div>)
      }
      return ""
    },
  }),
  createTableColumn<Scan>({
    columnId: "status",
    renderHeaderCell: () => {
      return "Trạng thái";
    },
    renderCell: (item) => {
      if (item.status === 0) {
        return "Chưa bắt đầu"
      }
      else if (item.status === 3) {
        return "Hoàn thành"
      }
      else if (item.status === 4) {
        if (item.error) {
          return `Lỗi item ${item.error.substring(0, 100)}`
        }
        return `Lỗi không xác định`
      }
      else {
        return <>
          <Spinner />
          {" Processing"}
        </>
      }
    },
  }),
  createTableColumn<Scan>({
    columnId: "profile",
    renderHeaderCell: () => {
      return "Profile quét";
    },
    renderCell: (item) => {
      return (
        <div style={{}}>
          {item.profile &&
            <Body1Stronger>{item.profile.name}</Body1Stronger>
          }
          <Divider />
          {item.profile &&

            <Text>{item.profile.desc}</Text>
          }
        </div>
      );
    },
  }),
  createTableColumn<Scan>({

    columnId: "targets",
    renderHeaderCell: () => {
      return <div>
        Danh sách mục tiêu
      </div>;
    },
    renderCell: (item) => {
      return (
        <div>
          {item.targets.map(item => <>
            <Body1Stronger>{item.url}</Body1Stronger><Divider /></>)}
        </div>
      );
    },
  }),
  createTableColumn<Scan>({
    columnId: "created_at",
    renderHeaderCell: () => {
      return "Thời gian tạo";
    },
    renderCell: (item) => {
      const date = new Date(item.created_at);
      const formattedDate = date.toLocaleString();
      return formattedDate;
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
      return "Xem chi tiết";
    },
    renderCell: (item) => {
      const [open, setOpen] = useState<boolean>(false)
      const button = <Button icon={<OpenRegular />} onClick={() => setOpen(true)}>Open</Button>;
      const title = "Scan Result"
      const children = <ScanDetailView result={item.result} status={item.status} log={item.log} />
      const action = <Button appearance="primary" icon={<PrintRegular />} value="Print Div Contents" id="btnPrint">
        In ra PDF
      </Button>
      return <DialogComponent
        open={open}
        setopen={setOpen}
        buttonTitle={button}
        title={title}
        children={children}
        action={action}
      />
    },
  }),
  createTableColumn<Scan>({
    columnId: "actions",
    renderHeaderCell: () => {
      return "Actions";
    },
    renderCell: (item) => {
      const sendDelete = () => {

        const url = `/api/user/scans/${item.id}`;

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

      const button = <Button aria-label="Xuất báo cáo" icon={<ArrowExportRegular />} onClick={() => setOpen(true)} disabled={!item.result}>Report</Button>
      const title = `Xuất Báo Cáo`;
      const [open, setOpen] = useState<boolean>(false)
      const children = <ReportView result={item.result} targets={item.targets} />;
      const action = (
        <Button appearance="primary" icon={<PrintRegular />} value="Print Div Contents" id="btnPrint">
          In ra PDF
        </Button>

      );
      const buttonDelete = <Button aria-label="Delete" icon={<DeleteRegular />} onClick={() => setOpen2(true)} />
      const titleDelete = `Xóa lượt quét`;
      const [open2, setOpen2] = useState<boolean>(false)
      const childrenDelete = <>Bạn có muốn xóa lượt quét này không?</>;
      const actionDelete = (
        <Button appearance="primary" icon={<DeleteRegular />} onClick={() => sendDelete()}>
          Xác nhận xóa
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
          <DialogComponent
            open={open2}
            setopen={setOpen2}
            buttonTitle={buttonDelete}
            title={titleDelete}
            children={childrenDelete}
            action={actionDelete}
          />
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
    filter: {},
    output: {},
    configuration: {},
    created_at: '',
    modified_at: '',
    option: {},
  }]);
  const selectTarget = useId('multi-target');
  const selectProfile = useId();

  const url = '/api/user/scans/';

  const getData = (): void => {
    axiosInstance.get(url)
      .then((response: { data: APIResponse }) => {
        setItems(response.data.results as Scan[]);
      })
      .catch((error: { error: Scan }) => {
        console.log(error);
      });
  };

  // const { data, error } = useQuery({ queryKey: ['scans'], queryFn: getData, refetchInterval: 5000 })
  // console.log(data, error)
  const getTarget = (): void => {
    const url = '/api/user/targets/';

    axiosInstance.get(url)
      .then((response: { data: APIResponse }) => {
        setTargetList(response.data.results as Target[]);
      })
      .catch((error: { error: Target }) => {
        console.log(error);
      });
  };

  const getProfile = (): void => {

    const url = '/api/user/scan_profiles/';

    axiosInstance.get(url)
      .then((response: { data: APIResponse }) => {
        setProfileList(response.data.results as ScanProfile[]);
      })
      .catch((error: { error: ScanProfile }) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    getTarget();
    getProfile();
  }, []);





  useEffect(() => {
    const interval = setInterval(() => {
      // if (items.filter(item => (item.status === 1 || item.status === 0)).length > 0) {
      // }
      getData()

    }, 5000);
    return () => clearInterval(interval);
  }, []);
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
    const url = '/api/user/scans/';

    axiosInstance.post(url, {
      profile: profile,
      targets: target.map(item => parseInt(item))
    })
      .then((response) => {
        setOpen(false);
        getData();
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        setOpen(false);
        console.log(error);
      });
  };

  const action = (
    <Button appearance="primary" icon={<ScanRegular />} onClick={() => handleAdvanceScan()}>
      Bắt đầu quét
    </Button>
  );
  const button = (<Button icon={<MoreCircleRegular />} appearance="secondary" onClick={() => setOpen(true)}>
    Quét nâng cao
  </Button>)
  const columnSizingOptions = {
    id: {
      minWidth: 40,
      defaultWidth: 80,
    },
    profile: {
      defaultWidth: 180,
      minWidth: 120,

    },
    targets: {
      defaultWidth: 320,
      minWidth: 240,

    },
  };
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
          <CardScan target={targetList[0].id} />
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
        <Button icon={<ArrowSyncRegular />} appearance="subtle" disabled>
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
          resizableColumns
          columnSizingOptions={columnSizingOptions}
        >
          <DataGridHeader>
            <DataGridRow>
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody<Scan>>
            {({ item }) => (
              <DataGridRow<Scan> key={item.id}>
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
