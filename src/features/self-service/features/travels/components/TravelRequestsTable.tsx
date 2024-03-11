import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TTravelRequest } from "../../requisitions/types/travel";
import { TravelRequestDetails } from "./TravelRequestDetails";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useGetTravelRequisitions } from "../../requisitions/hooks/travel/useGetTravelRequisitions";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

type TAction = "cancel" | "view" | "view-approval-stages";

export const TravelRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [request, setRequest] = useState<TTravelRequest>();
  const [action, setAction] = useState<TAction>();
  const handleAction = (key: TAction, item?: TTravelRequest) => {
    setAction(key);
    setRequest(item);
  };
  const onClose = () => {
    setAction(undefined);
    setRequest(undefined);
  };
  const { companyId, token } = useApiAuth();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetTravelRequisitions({
    companyId,
    token,
    status,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
    employeeId,
  });

  const columns: ColumnsType<TTravelRequest> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.createdAt).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Arrival Date",
      dataIndex: "adate",
      key: "adate",
      render: (_, item) => (
        <span>{moment(item.arrivalDate).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Departure Date",
      dataIndex: "ddate",
      key: "ddate",
      render: (_, item) => (
        <span>{moment(item.departureDate).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Travel ID",
      dataIndex: "id",
      key: "id",
      render: (_, item) => <span>{item.id} </span>,
    },

    {
      title: "Employee",
      dataIndex: "emp",
      key: "emp",
      render: (_, item) => <span>{getEmployeeFullName(item.employee)} </span>,
    },
    {
      title: "Reason",
      dataIndex: "reas",
      key: "reas",
      render: (_, item) => <span className="capitalize">{item.reason} </span>,
    },
    {
      title: "Duration (days)",
      dataIndex: "dura",
      key: "dura",
      render: (_, item) => <span className="capitalize">{item.duration} </span>,
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
          {item.status}
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
                onClick={() => handleAction("view-approval-stages", item)}
              >
                View Stages
              </Menu.Item>
              <Menu.Item key="39090" onClick={() => handleAction("view", item)}>
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
      {request && (
        <TravelRequestDetails
          open={action === "view"}
          handleClose={onClose}
          id={request.id}
        />
      )}
      {request && (
        <ViewApprovalStages
          handleClose={onClose}
          open={action === "view-approval-stages"}
          id={request?.id}
          type="travel"
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
