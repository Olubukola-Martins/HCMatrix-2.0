import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TEmployeeMedicalHistoryType } from "features/self-service/features/health-access/types/employee";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TBody = {
  condition: string;
  dateOfOnset: string;
};
type TData = {
  body: TBody;
  employeeId: number;
  type: TEmployeeMedicalHistoryType;
  medicalHistoryId: number;
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/employee/${props.data.employeeId}/medical/history/${props.data.type}/${props.data.medicalHistoryId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = {
    ...props.data.body,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdateEmployeeMedicalHistory = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
