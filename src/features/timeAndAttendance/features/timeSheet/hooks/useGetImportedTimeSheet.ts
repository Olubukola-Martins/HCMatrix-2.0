import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import download from "js-file-download";

type TResponse = any;
interface IDataProps {}
const TEMPLATE_NAME = "timesheet-template.csv";
const createData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/attendance/export/time-sheet-template`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);  

  download(res.data, TEMPLATE_NAME);
};

export const useGetImportedTimeSheet = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: IDataProps }) =>
    createData({
      data: props.data,

      auth: { token, companyId },
    })
  );
};
