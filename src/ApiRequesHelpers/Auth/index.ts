import axios from "axios";
import { ICurrentCompany } from "../../AppTypes/DataEntitities";

export interface IVerifyUserProps {
  token: string;
  uid: string;
  email?: string;
}
export const verifyUserToken = async ({ token, uid }: IVerifyUserProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/user/verification?token=${token}&uid=${uid}`;

  const response = await axios.get(url);
  return response;
};

export interface IRefreshTokenProps {
  refreshToken: string;
  token: string;
}
export const refreshUserToken = async ({
  refreshToken,
  token,
}: IRefreshTokenProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/authenticate/token/refresh?refreshToken=${refreshToken}
  `;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(url, config);
  return response;
};

export interface IUserLoginProps {
  emailOrEmpUid: string;
  password: string;
}
export const loginUser = async (props: IUserLoginProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/authenticate`;

  // necessary to make immediate changes when in  a central place when schema changes
  const data = { ...props };

  const response = await axios.post(url, data);
  return response;
};
export const loginUserWithMicrosoft = async () => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/authenticate/social/microsoft`;

  // necessary to make immediate changes when in  a central place when schema changes

  const response = await axios.post(url);
  return response;
};
export const o365MicrosoftRedirectUrl = async ({
  code,
  client_info,
  session_state,
}: {
  code: string;
  session_state: string;
  client_info: string;
}) => {
  let url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/authenticate/social/microsoft`;

  // necessary to make immediate changes when in  a central place when schema changes

  url += `?code=${code}&client_info=${client_info}&session_state=${session_state}`;
  const response = await axios.get(url);
  return response;
};
