import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TAddressGeoCodeDetails } from "types/address-geo-details";
import { GEOLOCATION_PARAMETERS } from "config/enviroment";

interface IDataProps {
  address: string;
}
export const QUERY_KEY_FOR_ADDRESS_GEO_CODE_DETAILS =
  "address-geo-code-details";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TAddressGeoCodeDetails[]> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json`;

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    params: {
      address: props.data.address,
      key: GEOLOCATION_PARAMETERS.GOOGLE_GEO_CODE_API_KEY,
    },
  };

  const res = await axios.get(url, config);
  const results: TAddressGeoCodeDetails[] = res?.data?.results ?? [];

  return results;
};

export const useGetAddressGeoCodeDetails = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_ADDRESS_GEO_CODE_DETAILS, props.address],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
