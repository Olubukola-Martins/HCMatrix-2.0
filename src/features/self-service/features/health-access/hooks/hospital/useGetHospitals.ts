import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { THospital } from "../../types/hospital/hospital";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  stateId?: number;
}

export const QUERY_KEY_FOR_HOSPITALS = "hospitals";

const getData = async (props: {
  type?: "mine";
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: THospital[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/hospital`;
  if (props.type === "mine") {
    url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/hospital/mine`;
  }
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
      stateId: props.data.stateId,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: THospital[] = result.map(
    (item: THospital): THospital => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetHospitals = ({
  props,
  type,
}: {
  props: IGetDataProps;
  type?: "mine";
}) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams, stateId } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_HOSPITALS, type, stateId, pagination, searchParams],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props,
        },
        type,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
