import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { AiOutlineMore } from "react-icons/ai";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu } from "antd";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useGetPositionChangeRequisitions4AuthEmployee } from "../../requisitions/hooks/position-change/useGetPositionChangeRequisitions4AuthEmployee";
import { TPositionChangeRequisition } from "../../requisitions/types/positionChange";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { PositionChangeRequestDetails } from "./PositionChangeRequestDetails";
import { CancelPositionChangeRequest } from "./CancelPositionChangeRequest";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";
import { TableWithFocusType } from "components/table";
type TAction = "cancel" | "view" | "view-approval-stages";

export const EmployeePositionChangeRequestsTable: React.FC<{
  status?: TApprovalStatus[] | TApprovalStatus;
}> = ({ status }) => {
  const [request, setRequest] = useState<TPositionChangeRequisition>();
  const [action, setAction] = useState<TAction>();
  const handleAction = (key: TAction, item?: TPositionChangeRequisition) => {
    setAction(key);
    setRequest(item);
  };
  const onClose = () => {
    setAction(undefined);
    setRequest(undefined);
  };
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetPositionChangeRequisitions4AuthEmployee({
    status,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: ColumnsType<TPositionChangeRequisition> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.date).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Employee",
      dataIndex: "Employee",
      key: "Employee",
      render: (_, item) => (
        <span className="capitalize">{getEmployeeFullName(item.employee)}</span>
      ),
    },
    {
      title: "Proposed Designation",
      dataIndex: "desc",
      key: "desc",
      render: (_, item) => (
        <span className="capitalize">{item.proposedDesignation.name} </span>
      ),
    },

    {
      title: "Skills And Qualifications",
      dataIndex: "skillsAndQualifications",
      key: "skillsAndQualifications",
      render: (_, item) => <span>{item.skillsAndQualifications} </span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span style={{ color: getAppropriateColorForStatus(item.status) }}>
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
                key="cancel"
                hidden={item.status !== "pending"}
                onClick={() => handleAction("cancel", item)}
              >
                Cancel
              </Menu.Item>
              <Menu.Item key="3" onClick={() => handleAction("view", item)}>
                View Details
              </Menu.Item>
              <Menu.Item
                key="390909"
                onClick={() => handleAction("view-approval-stages", item)}
              >
                View Stages
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button title="Actions" icon={<AiOutlineMore />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {request && (
        <PositionChangeRequestDetails
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
          type="position-change"
        />
      )}
      <CancelPositionChangeRequest
        handleClose={onClose}
        open={action === "cancel"}
        data={request}
      />
      <TableWithFocusType
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
