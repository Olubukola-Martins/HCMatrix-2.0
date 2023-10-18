import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TransferDetails } from "./TransferDetails";
import { TTransferRequisition } from "../../requisitions/types/transfer";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useGetTransferRequisitions4AuthEmployee } from "../../requisitions/hooks/transfer/useGetTransferRequisitions4AuthEmployee";

export const EmployeeTransferRequestsTable: React.FC<{
  status?: TApprovalStatus[] | TApprovalStatus;
}> = ({ status }) => {
  const [requestId, setRequestId] = useState<number>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetTransferRequisitions4AuthEmployee({
    status,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: ColumnsType<TTransferRequisition> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <span className="capitalize">
          {item ? getEmployeeFullName(item.employee) : ""}
        </span>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "Employee ID",
      key: "Employee ID",
      render: (_, item) => (
        <span className="capitalize">{item.employee.empUid} </span>
      ),
    },
    {
      title: "Current Designation",
      dataIndex: "Current Designation",
      key: "Current Designation",
      render: (_, item) => <span className="capitalize">N/A </span>,
    },

    {
      title: "Current Department",
      dataIndex: "Current Department",
      key: "Current Department",
      render: (_, item) => <span>N/A</span>,
    },
    {
      title: "Current Location",
      dataIndex: "Current Location",
      key: "Current Location",
      render: (_, item) => <span>N/A</span>,
    },
    {
      title: "Proposed Designation",
      dataIndex: "Proposed Designation",
      key: "Proposed Designation",
      render: (_, item) => <span>{item.proposedDesignation.name}</span>,
    },
    {
      title: "Proposed Department",
      dataIndex: "Proposed Department",
      key: "Proposed Department",
      render: (_, item) => (
        <span>{item.proposedDesignation.department.name}</span>
      ),
    },
    {
      title: "Proposed Location",
      dataIndex: "Proposed Location",
      key: "Proposed Location",
      render: (_, item) => <span>{"N/A"}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span
          className="capitalize"
          style={{ color: getAppropriateColorForStatus(item.status) }}
        >
          {item.status}{" "}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="3"
                onClick={() => {
                  setRequestId(item.id);
                }}
              >
                View Details
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            title="Actions"
            icon={<MoreOutlined />}
            type="text"
            // onClick={() => handleEdit(item._id)}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {requestId && (
        <TransferDetails
          open={!!requestId}
          handleClose={() => setRequestId(undefined)}
          id={requestId}
        />
      )}
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={columns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
