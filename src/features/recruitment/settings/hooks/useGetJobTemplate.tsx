import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ITemplateData } from "../types";
import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";

export const QUERY_KEY_FOR_JOB_TEMPLATE = "JobTemplate";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<ITemplateData[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/settings/job-templates`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: ITemplateData[] = res.data.data.result;
  return item;
};

export const useGetJobTemplate = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_JOB_TEMPLATE],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
