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
import { Template } from "../type";

import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

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
    const getData = (): void => {
       
        const url = '/api/user/templates/';
      
        axiosInstance.get(url)
          .then((response) => {
            setItems(response.data.results);
          })
          .catch((error: { error: Template }) => {
            console.log(error);
          });
      };
      
    useEffect(
        () => getData(), []
    )

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
