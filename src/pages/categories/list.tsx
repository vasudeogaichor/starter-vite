import { List, useTable } from "@refinedev/antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { Table } from "antd";
export const ListCategories = () => {
    
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};
