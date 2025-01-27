import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  csvFile: any;
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/hospital/bulk`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData = {
    ...props.data,
  };

  const response = await axios.postForm(url, data, config);
  return response;
};
export const useImportBulkHospital = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TData }) =>
    createData({
      data: props.data,
      auth: { token, companyId },
    })
  );
};
