import {
    DataGridBody,
    DataGridRow,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
    TableColumnDefinition,
    createTableColumn,
} from "@fluentui/react-components";
import { Template, TemplateResponse } from "../type";
import axios from "axios";
import { useState } from "react";
interface AxiosConfig {
    method: string;
    maxBodyLength: number;
    url: string;
    headers: {
        Authorization: string;
    };
}

const columns: TableColumnDefinition<Template>[] = [
    createTableColumn<Template>({
        columnId: "name",
        renderHeaderCell: () => {
            return "Name";
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
];

export const CompositeNavigation = () => {
    const [items, setItems] = useState<Template[]>([]);
    const token = localStorage.getItem("access_token");
    const config: AxiosConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: "/api/user/templates/",

        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    axios(config)
        .then((response: { data: TemplateResponse }) => {
            setItems(response.data.results);
        })
        .catch((error: { error: Template }) => {
            console.log(error);
        });
    return (
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
    );
};

export default CompositeNavigation;
