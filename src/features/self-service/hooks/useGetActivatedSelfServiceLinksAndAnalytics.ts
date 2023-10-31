import { ISelfBoxProps, TRequisitionBoxProps } from "../components/SelfBox";
import { useGetSelfServiceDBAnalytics } from "./useGetSelfServiceDashboardAnalytics";
import loan from "../assets/images/loan.svg";
import leave from "../assets/images/leave.svg";
import health from "../assets/images/health.svg";
import payslip from "../assets/images/payslip.svg";
import attendance from "../assets/images/attendance.svg";
import vehicle from "../assets/images/vehicle.svg";
import requisition from "../assets/images/requisition.svg";
import Onboarding from "../assets/images/Onboarding.svg";
import { appRoutes } from "config/router/paths";
import { TSelfServiceDBAnalytics } from "../types";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
type TData = {
  primaryData: ({ item: ISelfBoxProps } & { hidden: boolean })[];
  requisitionData: TRequisitionBoxProps;
  selfServiceDBAnalytics: TSelfServiceDBAnalytics;
};
export const useGetActivatedSelfServiceLinksAndAnalytics = (): {
  data?: TData;
  isLoading?: boolean;
  isError?: boolean;
} => {
  const { data, isLoading, isError } = useGetSelfServiceDBAnalytics();
  const { userPermissions } = useGetUserPermissions();

  return {
    data: data
      ? {
          primaryData: [
            {
              hidden: false,
              item: {
                icon: Onboarding,
                link: appRoutes.onboarding,
                title: "Onboarding",
                desc: "You can now access and manage onboarding",
              },
            },
            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "loan" && item.isActive
                ) === false,
              item: {
                icon: loan,
                link: appRoutes.loans,
                title: "Loan",
                desc: "You can apply and manage loan requests",
              },
            },

            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "leave" && item.isActive
                ) === false,

              item: {
                icon: leave,
                link: appRoutes.leaveHome,
                title: "Leave",
                desc: "You can apply and manage leave requests",
              },
            },

            {
              hidden: true, //Pending when its fleshed out
              item: {
                icon: health,
                link: appRoutes.healthAccessHome,
                title: "Health Access",
              },
            },
            {
              hidden: false, //Subscription
              item: {
                icon: payslip,
                link: appRoutes.payslipTransactions,
                title: "Payslip",
                desc: "You can view payslips and transactions",
              },
            },
            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "exit-handover-form" && item.isActive
                ) === false,
              item: {
                icon: attendance,
                link: appRoutes.newHandOverForm,
                title: "Hand Over",
                desc: "You can now access and manage employee resignations",
              },
            },
            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "vehicle" && item.isActive
                ) === false,
              item: {
                icon: vehicle,
                link: appRoutes.vehicleBooking,
                title: "Vehicle booking",
                desc: "You can now manage vehicles and their bookings",
              },
            },
            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "asset" && item.isActive
                ) === false,
              item: {
                icon: attendance,
                link: appRoutes.selfServiceAssets,
                title: "Asset",
                desc: "You can now manage assets within your organization",
              },
            },
            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "conference-room" && item.isActive
                ) === false,
              item: {
                icon: leave,
                link: appRoutes.conferenceRoomBooking,
                title: "Conference Room",
                desc: "You can now manage conference rooms within your organization",
              },
            },
            {
              hidden: false,
              item: {
                icon: payslip,
                link: appRoutes.selfServiceTasks,
                title: "Tasks",
                desc: "You can now assign and manage tasks within your organization",
              },
            },
            {
              hidden: false,
              item: {
                icon: payslip,
                link: appRoutes.documents,
                title: "Documents",
                desc: "You can now manage documents within your organization",
              },
            },
            // _______________ Self Service General Settings ______________
            // TODO: Make this a card like requisition box
            // TODO: Populate other settings page that are independent of the feature here
            // TODO: Create a settings page for asset, and vehicle
            // TODO: Refactor all components that use address to use the FormAddressinput
            {
              hidden: !canUserAccessComponent({
                requiredPermissions: ["manage-resignation"],
                userPermissions,
              }),
              item: {
                icon: attendance,
                link: appRoutes.resignationPolicySettings,
                title: "Resignation Setting",
                desc: "You can activate and configure resignation settings",
              },
            },
            {
              hidden: !canUserAccessComponent({
                requiredPermissions: ["manage-conference-room-settings"],
                userPermissions,
              }),
              item: {
                icon: leave,
                link: appRoutes.conferenceRoomBookingSetting,
                title: "Conference Room Setting",
                desc: "You can activate and configure conference room settings",
              },
            },
            {
              hidden: !canUserAccessComponent({
                requiredPermissions: ["manage-leave-settings"],
                userPermissions,
              }),

              item: {
                icon: leave,
                link: appRoutes.leaveSettings,
                title: "Leave Setting",
                desc: "You can activate and configure leave settings",
              },
            },
            {
              hidden: !canUserAccessComponent({
                requiredPermissions: ["manage-loan-settings"],
                userPermissions,
              }),
              item: {
                icon: loan,
                link: appRoutes.loanPolicies,
                title: "Loan Settings",
                desc: "You can activate and manage loan settings",
              },
            },
          ],
          requisitionData: {
            icon: requisition,
            requisitions: [
              {
                link: appRoutes.selfServiceRequisition,
                title: "Setting",
                hidden: false, //Based on Permission
              },
              {
                link: appRoutes.selfServiceTravels,
                title: "Travel Requisition",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "travel" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServiceAssets,
                title: "Asset Requisition",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "asset" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServiceJob,
                title: "Job Requisition",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "job" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServicePositionChange,
                title: "Position Change Requisition",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "position-change" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServicePromotion,
                title: "Promotion Requisition",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "promotion" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServiceReimbursement,
                title: "Reimbursement Requisition",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "reimbursement" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServiceTransfer,
                title: "Transfer Requisition",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "transfer" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServiceMonetary,
                title: "Monetary Requisition",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "money" && item.isActive
                  ) === false,
              },
            ],
          },
          selfServiceDBAnalytics: data,
        }
      : undefined,
    isLoading,
    isError,
  };
};
