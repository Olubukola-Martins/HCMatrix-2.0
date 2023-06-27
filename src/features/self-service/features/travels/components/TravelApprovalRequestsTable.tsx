import { Space, Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { TApprovalStatus } from "types/statuses";

import moment from "moment";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useQueryClient } from "react-query";
import { TravelRequestDetails } from "./TravelRequestDetails";
import { QUERY_KEY_FOR_TRAVEL_REQUESTS } from "../../requisitions/hooks/travel/useGetTravelRequisitions";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

const TravelApprovalRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const queryClient = useQueryClient();

  const [showD, setShowD] = useState(false);
  const [requestId, setRequestId] = useState<number>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "travel",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_TRAVEL_REQUESTS],
        // exact: true,
      });
    },
  });

  const originalColumns: ColumnsType<TApprovalRequest> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>
          {moment(item.travelRequisition?.createdAt).format("YYYY/MM/DD")}{" "}
        </span>
      ),
    },
    {
      title: "Arrival Date",
      dataIndex: "adate",
      key: "adate",
      render: (_, item) => (
        <span>
          {moment(item.travelRequisition?.arrivalDate).format("YYYY/MM/DD")}{" "}
        </span>
      ),
    },
    {
      title: "Departure Date",
      dataIndex: "ddate",
      key: "ddate",
      render: (_, item) => (
        <span>
          {moment(item.travelRequisition?.departureDate).format("YYYY/MM/DD")}{" "}
        </span>
      ),
    },
    {
      title: "Travel ID",
      dataIndex: "id",
      key: "id",
      render: (_, item) => <span>{item.travelRequisition?.id} </span>,
    },

    {
      title: "Employee",
      dataIndex: "emp",
      key: "emp",
      render: (_, item) => (
        <span>
          {item.travelRequisition
            ? getEmployeeFullName(item.travelRequisition?.employee)
            : ""}
        </span>
      ),
    },
    {
      title: "Reason",
      dataIndex: "reas",
      key: "reas",
      render: (_, item) => (
        <span className="capitalize">{item.travelRequisition?.reason} </span>
      ),
    },
    {
      title: "Duration (days)",
      dataIndex: "dura",
      key: "dura",
      render: (_, item) => (
        <span className="capitalize">{item.travelRequisition?.duration} </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",

      key: "status",
      render: (val, item) => (
        <span
          className="capitalize"
          style={{
            color: getAppropriateColorForStatus(
              item?.travelRequisition?.status ?? ""
            ),
          }}
        >
          {item?.travelRequisition?.status}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, item) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="3"
                  onClick={() => {
                    setShowD(true);
                    setRequestId(item?.travelRequisition?.id);
                  }}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  hidden={item.travelRequisition?.status !== "pending"}
                  key="2"
                  onClick={() =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "approved",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                    })
                  }
                >
                  Approve
                </Menu.Item>
                <Menu.Item
                  hidden={item.travelRequisition?.status !== "pending"}
                  key="1"
                  onClick={() =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "rejected",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                    })
                  }
                >
                  Reject
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const columns = originalColumns;

  return (
    <div>
      {requestId && (
        <TravelRequestDetails
          open={showD}
          handleClose={() => setShowD(false)}
          id={requestId}
        />
      )}

      <Table
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default TravelApprovalRequestsTable;