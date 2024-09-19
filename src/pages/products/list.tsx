import { getDefaultFilter, useMany, useNavigation } from "@refinedev/core";
import { Link } from "react-router-dom";
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
} from "@refinedev/antd";
import { Input, Select, Space, Table } from "antd";

export const ListProducts = () => {
  // const {
  //   tableQuery: { data, isLoading },
  //   current,
  //   setCurrent,
  //   pageCount,
  //   sorters,
  //   setSorters,
  // } = useTable({
  //   // resource: "protected-products",
  //   pagination: { current: 1, pageSize: 10 },
  //   sorters: { initial: [{ field: "id", order: "asc" }] },
  //   syncWithLocation: true
  // });

  const { tableProps, sorters, filters } = useTable({
    sorters: {
      initial: [{ field: "id", order: "asc" }],
    },
    filters: {
      initial: [{ field: "category.id", operator: "eq", value: 2 }],
    },
    syncWithLocation: true,
  });

  const { showUrl, editUrl } = useNavigation();

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: getDefaultFilter("category.id", filters, "eq"),
  });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // const onPrevious = () => {
  //   if (current > 1) {
  //     setCurrent(current - 1);
  //   }
  // };

  // const onNext = () => {
  //   if (current < pageCount) {
  //     setCurrent(current + 1);
  //   }
  // };

  // const onPage = (page: number) => {
  //   setCurrent(page);
  // };

  // const getSorter = (field: string) => {
  //   const sorter = sorters?.find((sorter) => sorter.field === field);

  //   if (sorter) {
  //     return sorter.order;
  //   }
  // };

  // const onSort = (field: string) => {
  //   const sorter = getSorter(field);
  //   setSorters(
  //     sorter === "desc"
  //       ? []
  //       : [
  //           {
  //             field,
  //             order: sorter === "asc" ? "desc" : "asc",
  //           },
  //         ],
  //   );
  // };

  // const indicator = { asc: "⬆️", desc: "⬇️" };

  return (
    <div>
      <h1>Products</h1>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input />
              </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) return "Loading...";

            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              mapValue={(selectedKey) => Number(selectedKey)}
            >
              <Select style={{ minWidth: 200 }} {...selectProps} />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("category.id", filters, "eq")}
        />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      {/* <table>
        <thead>
          <tr>
            <th onClick={() => onSort("id")}>
              ID {indicator[getSorter("id")]}
            </th>
            <th onClick={() => onSort("name")}>
              Name {indicator[getSorter("name")]}
            </th>
            <th>Category</th>
            <th onClick={() => onSort("material")}>
              Material {indicator[getSorter("material")]}
            </th>
            <th onClick={() => onSort("price")}>
              Price {indicator[getSorter("price")]}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                {
                  categories?.data?.find(
                    (category) => category.id == product.category?.id,
                  )?.title
                }
              </td>
              <td>{product.material}</td>
              <td>{product.price}</td>
              <td>
                <Link to={showUrl("protected-products", product.id)}>Show</Link>
                <Link to={editUrl("protected-products", product.id)}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button type="button" onClick={onPrevious}>
          {"<"}
        </button>
        <div>
          {current - 1 > 0 && (
            <span onClick={() => onPage(current - 1)}>{current - 1}</span>
          )}
          <span className="current">{current}</span>
          {current + 1 < pageCount && (
            <span onClick={() => onPage(current + 1)}>{current + 1}</span>
          )}
        </div>
        <button type="button" onClick={onNext}>
          {">"}
        </button>
      </div> */}
    </div>
  );
};
