import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TApprovalStatus } from "types/statuses";
import { TTransferRequisition } from "../../types/transfer";

interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  status?: TApprovalStatus;
  employeeId?: number;
}

export const QUERY_KEY_FOR_TRANSFER_REQUISITIONS = "transfer-requisitions";

const getData = async (
  props: IGetDataProps
): Promise<{ data: TTransferRequisition[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/transfer`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
      employeeId: props.employeeId,
      status: props.status,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TTransferRequisition[] = result.map(
    (item: TTransferRequisition): TTransferRequisition => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetTransferRequisitions = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_TRANSFER_REQUISITIONS, props],
    () =>
      getData({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};