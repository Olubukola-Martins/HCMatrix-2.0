import { ISearchParams } from "AppTypes/Search";
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import {
  createDesignation,
  getDesignations,
  getSingleDesignation,
  IGetSingleDesgProps,
  updateDesignation,
} from "../../ApiRequesHelpers/Utility/designations";
import { TDesignation } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";

interface IFRQDesignationsProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;

  companyId: string;
  onSuccess?: Function;
  token: string;
}
export interface IFRQDesignationsReturnProps {
  data: TDesignation[];
  total: number;
}
export const useFetchSingleDesignation = ({
  designationId,
  companyId,

  token,
}: IGetSingleDesgProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["single-designation", designationId],
    () =>
      getSingleDesignation({
        companyId,
        designationId,
        token,
      }),
    {
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },

      select: (res: any) => {
        const item = res.data.data;

        const data: TDesignation = {
          id: item.id,
          name: item.name,
          department: {
            id: item.department.id ?? "",
            name: item.department.name ?? "",
          },
          employeeCount: item.employeeCount ?? 0,
        };

        return data;
      },
    }
  );

  return queryData;
};
export const useFetchDesignations = ({
  pagination,
  searchParams,

  companyId,
  onSuccess,
  token,
}: IFRQDesignationsProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    [
      "designations",
      pagination?.current,
      pagination?.limit,
      searchParams?.name,
    ],
    () =>
      getDesignations({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
        searchParams: { name: searchParams?.name },

        token,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        signOut();
        localStorage.clear();
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },

      select: (res: any) => {
        const fetchedData = res.data.data;
        const result = fetchedData.result;

        const data: TDesignation[] = result.map(
          (item: any): TDesignation => ({
            id: item.id,
            name: item.name,
            department: {
              id: item.department.id ?? "",
              name: item.department.name ?? "",
            },
            employeeCount: item.employeeCount ?? 0,
          })
        );

        const ans: IFRQDesignationsReturnProps = {
          data,
          total: fetchedData.totalCount,
        };

        return ans;
      },
    }
  );

  return queryData;
};

export const useCreateDesignation = () => {
  return useMutation(createDesignation);
};
export const useUpdateDesignation = () => {
  return useMutation(updateDesignation);
};
