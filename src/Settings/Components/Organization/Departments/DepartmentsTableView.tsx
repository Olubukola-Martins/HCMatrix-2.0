import React from "react";
import { motion } from "framer-motion";
import { TDepartment } from "../../../../AppTypes/DataEntitities";
import { PaginationProps, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";

interface IProps {
  departments: TDepartment[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TDepartment>["onChange"];
}

export const DepartmentsTableView = ({
  departments,
  loading,
  pagination,
  onChange,
}: IProps) => {
  const columns: ColumnsType<TDepartment> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department Head",
      dataIndex: "departmentHeadId",
      key: "departmentHeadId",
    },
    {
      title: "Parent Department",
      dataIndex: "parentDepartmentId",
      key: "parentDepartmentId",
    },
    {
      title: "Emloyee Count",
      dataIndex: "employeeCount",
      key: "employeeCount",
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        size="small"
        dataSource={departments}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};