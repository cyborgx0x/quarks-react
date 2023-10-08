import { ReactElement, useEffect, useState } from "react";
import { APIResponse, AxiosConfig, Target } from "../type";
import axios from "axios";

import {
    DataGrid,
    DataGridBody,
    DataGridCell,
    LargeTitle,
    Title3,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridRow,
    TableColumnDefinition,
    createTableColumn,
    Button,
} from "@fluentui/react-components";
import { DeleteRegular, EditRegular, OpenRegular } from "@fluentui/react-icons";


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
        renderCell: () => {
            return <Button icon={<OpenRegular />}>Open</Button>;
        },
    }),
    createTableColumn<Target>({
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
    }
    useEffect(
        () => getData(), []
    )
    return (
        <>
            <LargeTitle>
                Targets
            </LargeTitle>
            <Title3>
                Danh sách các mục tiêu
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
    )
}