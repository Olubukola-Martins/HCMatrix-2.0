import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TAddProps = {
  name: string;
  maxDependents: number;
  description?: string;
};

const createData = async (props: {
  data: TAddProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/hmo-plan`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TAddProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useAddHMOPlan = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TAddProps) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
