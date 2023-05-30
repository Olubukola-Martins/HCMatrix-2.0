import { Button, Dropdown, Menu, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import { MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { TEmployee } from "../../types";
import { getEmployeeStatusColor } from "../../utils/getEmployeeStatusColor";

interface IProps {
  employees: TEmployee[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  rowSelection: TableRowSelection<TEmployee>;
  onChange?: TableProps<TEmployee>["onChange"];
}

const ActiveEmpTableView = ({
  employees,
  loading,
  pagination,
  rowSelection,
  onChange,
}: IProps) => {
  const columns: ColumnsType<TEmployee> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <Link
          to={`${appRoutes.singleEmployee(item.id).path}`}
          className="text-caramel hover:underline hover:text-caramel"
        >
          {item.firstName} {item.lastName}
        </Link>
      ),
    },

    {
      title: "Employee ID",
      dataIndex: "employeeID",
      key: "employeeID",
      render: (_, item) => item.empUid,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (_, item) => item.designation?.department?.name ?? "none",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, item) => item.role.name,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      width: 20,
    },
    {
      title: "Employee Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={`capitalize ${getEmployeeStatusColor(status)}`}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "Action",
      width: 100,
      fixed: "right",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>Edit</Menu.Item>
            </Menu>
          }
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={employees.map((item) => ({ ...item, key: item.id }))}
        scroll={{ x: "max-content" }}
        loading={loading}
        className="mt-5"
        size="small"
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};

export default ActiveEmpTableView;