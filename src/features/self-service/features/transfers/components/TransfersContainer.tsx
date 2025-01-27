import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewTransfer } from "./NewTransfer";
import { TransferRequestsTableContainer } from "./TransferRequestsTableContainer";
import { Tabs } from "antd";
import TransferApprovalRequestsContainer from "./TransferApprovalRequestsContainer";
import { EmployeeTransferRequests } from "./EmployeeTransferRequests";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import {
  useGetUserPermissions,
  canUserAccessComponent,
} from "components/permission-restriction/PermissionRestrictor";

export const TransfersContainer = () => {
  const [showM, setShowM] = useState(false);
  const { userPermissions } = useGetUserPermissions();
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeeTransferRequests />,
      hidden: false,
    },
    {
      key: "My Approvals",
      label: "My Approvals",
      children: <TransferApprovalRequestsContainer />,
      hidden: false,
    },

    {
      key: "All Requests",
      label: "All Requests",
      children: <TransferRequestsTableContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-transfer-requests"],
      }),
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      <NewTransfer open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for tranfers.`}
        actions={[
          { name: "New Request", handleClick: () => setShowM(true) },
          {
            name: "Setting",
            handleClick: () => navigate(appRoutes.selfServiceTransferSetting),
            btnVariant: "transparent",
            hidden: !canUserAccessComponent({
              userPermissions,
              requiredPermissions: ["manage-requsition-settings"],
            }),
          },
        ]}
      />
      <Tabs items={tabItems.filter((item) => item.hidden === false)} />
    </div>
  );
};
