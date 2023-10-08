import { LargeTitle, shorthands, makeStyles, DataGrid, DataGridHeader, DataGridRow, DataGridHeaderCell, DataGridBody, DataGridCell, createTableColumn, TableColumnDefinition, Button, Divider, Body1Strong } from "@fluentui/react-components";
import { ReactElement, useEffect, useState } from "react";
import { APIResponse, AxiosConfig, Scan } from "../type";
import axios from "axios";
import { DeleteRegular, EditRegular, OpenRegular, ArrowSyncRegular, MoreCircleRegular } from "@fluentui/react-icons";
import CardScan from "../components/CardScan";


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
            return (
                <>
                    <Button aria-label="Edit" icon={<EditRegular />} />
                    <Button aria-label="Delete" icon={<DeleteRegular />} />
                </>
            );
        },
    }),
];

export default function ScanList(): ReactElement {
    const [items, setItems] = useState<Scan[]>([]);
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
    }
    useEffect(
        () => getData(), []
    )
    const styles = useStyles();
    return (
        <div className={styles.root}>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                <LargeTitle>
                    Scans
                </LargeTitle>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: "192px",
            }}>
                <Divider vertical alignContent="center" className={styles.customLineStyle}>
                    
                    <CardScan />


                </Divider>
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", minHeight: "42px" }}>
                <Button icon={<ArrowSyncRegular />} appearance="subtle">Thay bằng Profile khác?</Button>
                <Button icon={<MoreCircleRegular />} appearance="secondary">Quét nâng cao</Button>
            </div>
            <Body1Strong>
                Danh sách các lượt quét
            </Body1Strong>
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
    )
}