import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayGradeCategory } from "features/payroll/types";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const QUERY_KEY_FOR_PAY_GRADE_CATEGORIES = "pay-grade-categories";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TPayGradeCategory[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/pay-grade/category`;

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
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TPayGradeCategory[] = result.map(
    (item: TPayGradeCategory): TPayGradeCategory => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetPayGradeCategories = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAY_GRADE_CATEGORIES, pagination, searchParams],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
