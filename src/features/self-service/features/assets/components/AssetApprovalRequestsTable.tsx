import { Space, Dropdown, Menu } from "antd";
import { TableWithFocusType } from "components/table";
import { MoreOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { usePagination } from "hooks/usePagination";
import { useQueryClient } from "react-query";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { QUERY_KEY_FOR_ASSET_REQUISITIONS } from "../../requisitions/hooks/asset/useGetAssetRequisitions";
import { TApprovalStatus } from "types/statuses";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { AssetRequestDetails } from "./AssetRequestDetails";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { QUERY_KEY_FOR_ASSET_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../hooks/requisitions/useGetAssetRequisitions4AuthEmployee";
const AssetApprovalRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const queryClient = useQueryClient();

  const [showD, setShowD] = useState(false);
  const [request, setRequest] = useState<TApprovalRequest>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "asset",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_ASSET_REQUISITIONS],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_ASSET_REQUISITIONS_FOR_AUTH_EMPLOYEE],
        // exact: true,
      });
    },
  });

  const originalColumns: ColumnsType<TApprovalRequest> = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val, item) =>
        moment(item.assetRequisition?.date).format("YYYY-MM-DD"),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span>
          {item.assetRequisition &&
            getEmployeeFullName(item.assetRequisition?.employee)}
        </span>
      ),
    },

    {
      title: "Asset",
      dataIndex: "Asset",
      key: "Asset",
      render: (_, item) => (
        <span>{item.assetRequisition?.asset.name ?? "N/A"}</span>
      ),
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
                    setRequest(item);
                  }}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  hidden={item.assetRequisition?.status !== "pending"}
                  key="2"
                  onClick={() =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "approved",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                      requires2FA: item?.advancedStage?.enableTwoFactorAuth,
                    })
                  }
                >
                  Approve
                </Menu.Item>
                <Menu.Item
                  hidden={item.assetRequisition?.status !== "pending"}
                  key="1"
                  onClick={() =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "rejected",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                      requires2FA: item?.advancedStage?.enableTwoFactorAuth,
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
  const columns = employeeId
    ? originalColumns.filter((item) => item.key !== "name")
    : originalColumns;
  return (
    <div>
      {request?.assetRequisition && (
        <AssetRequestDetails
          id={request.assetRequisition?.id}
          open={showD}
          handleClose={() => setShowD(false)}
          approvalRequest={request}
        />
      )}

      <TableWithFocusType
        columns={columns}
        size="small"
        dataSource={data?.data.map((item) => ({
          ...item,
          key: item.id,
        }))}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default AssetApprovalRequestsTable;
