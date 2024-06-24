import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TLeaveRecall } from "../../types";

interface IGetDataProps {
  pagination?: IPaginationProps;
  employeeId?: number;
}

export const QUERY_KEY_FOR_ALL_LEAVE_RECALLS = "all-leave-recalls";

const getData = async (
  props: IGetDataProps,
  auth: ICurrentCompany
): Promise<{ data: TLeaveRecall[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/recall`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {
      limit,
      offset,
      employeeId: props.employeeId,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TLeaveRecall[] = result.map(
    (item: TLeaveRecall): TLeaveRecall => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetAllLeaveRecalls = (props: IGetDataProps = {}) => {
  const { pagination, employeeId } = props;
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_ALL_LEAVE_RECALLS, pagination, employeeId],
    () =>
      getData(
        {
          ...props,
        },
        {
          token,
          companyId,
        }
      ),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};