import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation, useQueryClient } from "react-query";
import { ICurrentCompany } from "types";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_LEAVE_TYPES } from "./useGetLeaveTypes";

type TData = {
  leaveTypeId: number;

  isActive: boolean;
};
const delData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/type/${props.data.leaveTypeId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };
  const data = {
    isActive: props.data.isActive,
  };
  const response = await axios.patch(url, data, config);
  return response;
};
export const useActivateOrDeactivateLeaveType = () => {
  const queryClient = useQueryClient();

  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: TData) => delData({ data: props, auth: { token, companyId } }),
    {
      onSuccess: (res, variables, context) => {
        openNotification({
          state: "success",

          title: "Success",
          description: res.data.message,
          // duration: 0.4,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_FOR_LEAVE_TYPES],
          // exact: true,
        });
      },
      onError: (err: any, variables, context) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response?.data.message ?? err?.response?.data.error.message,
        });
      },
    }
  );
};