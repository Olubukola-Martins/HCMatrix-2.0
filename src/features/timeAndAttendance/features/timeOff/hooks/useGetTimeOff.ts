import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ITimeOffProps } from "../types";
import { IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_TIME_OFF = "timeOff";

const getData = async (props: {
  token: string;
  companyId: number;
  pagination?: IPaginationProps;
  status?: string;
  empUid: string;
}): Promise<{ data: ITimeOffProps[]; total: number }> => {
  const limit = props.pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = props.pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/time-off-requests`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {
      limit,
      offset,
      status: props.status,
      empUid: props.empUid,
    },
  };

  const res = await axios.get(url, config);

  const fetchedData = res.data.data;

  const result = fetchedData.result;

  const data: ITimeOffProps[] = result;

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const useGetTimeOff = (props?: {
  pagination?: IPaginationProps;
  status?: string;
}) => {
  const { companyId, token, currentCompanyEmployeeDetails } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_TIME_OFF, props?.pagination, props?.status],
    () =>
      getData({
        token,
        companyId,
        pagination: props?.pagination,
        status: props?.status,
        empUid: currentCompanyEmployeeDetails?.empUid || "",
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
