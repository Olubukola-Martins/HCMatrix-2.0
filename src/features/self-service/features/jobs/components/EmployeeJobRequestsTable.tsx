import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { AiOutlineMore } from "react-icons/ai";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu } from "antd";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { useGetJobRequisitions4AuthEmployee } from "../../requisitions/hooks/job/useGetJobRequisitions4AuthEmployee";
import { TJobRequisition } from "../../requisitions/types/job";
import { JobRequestDetails } from "./JobRequestDetails";
import { CancelJobRequest } from "./CancelJobRequest";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";
import { TableWithFocusType } from "components/table";

type TAction = "cancel" | "view" | "view-approval-stages";

export const EmployeeJobRequestsTable: React.FC<{
  status?: TApprovalStatus[] | TApprovalStatus;
}> = ({ status }) => {
  const [request, setRequest] = useState<TJobRequisition>();
  const [action, setAction] = useState<TAction>();
  const handleAction = (key: TAction, item?: TJobRequisition) => {
    setAction(key);
    setRequest(item);
  };
  const onClose = () => {
    setAction(undefined);
    setRequest(undefined);
  };
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetJobRequisitions4AuthEmployee({
    status,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: ColumnsType<TJobRequisition> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.date).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Preferred Start Date",
      dataIndex: "preferredStartDate",
      key: "preferredStartDate",
      render: (_, item) => (
        <span className="capitalize">
          {moment(item.preferredStartDate).format(DEFAULT_DATE_FORMAT)}{" "}
        </span>
      ),
    },
    {
      title: "Designation",
      dataIndex: "desc",
      key: "desc",
      render: (_, item) => (
        <span className="capitalize">{item.designation.name} </span>
      ),
    },

    {
      title: "Employment Type",
      dataIndex: "emptype",
      key: "emptype",
      render: (_, item) => <span>{item.employmentType} </span>,
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
                key="3333"
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
        <JobRequestDetails
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
          type="job"
        />
      )}

      <CancelJobRequest
        open={action === "cancel"}
        handleClose={onClose}
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
