import { Spin } from "antd";
import pagination from "antd/lib/pagination";
import { ISearchParams } from "AppTypes/Search";
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  ICreateDepProps,
  IGetSingleDeptProps,
  updateDepartment,
} from "../../ApiRequesHelpers/Utility/departments";
import { TDepartment } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { openNotification } from "../../NotificationHelpers";

interface IFRQDepartmentsProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  companyId: string;
  onSuccess?: Function;
  token: string;
}
export interface IFRQDepartmentsReturnProps {
  data: TDepartment[];
  total: number;
}

export const useFetchDepartments = ({
  pagination,
  companyId,
  onSuccess,
  token,
  searchParams,
}: IFRQDepartmentsProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["departments", pagination?.current, pagination?.limit, searchParams?.name],
    () =>
      getDepartments({
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
        signOut();
        localStorage.clear();
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },

      select: (res: any) => {
        const fetchedData = res.data.data;
        const result = fetchedData.result;

        const data: TDepartment[] = result.map(
          (item: any): TDepartment => ({
            id: item.id,
            name: item.name,
            email: item.email,
            employeeCount: item.employeeCount ?? 0,
          })
        );

        const ans: IFRQDepartmentsReturnProps = {
          data,
          total: fetchedData.totalCount,
        };

        return ans;
      },
    }
  );

  return queryData;
};
export const useFetchSingleDepartment = ({
  departmentId,
  companyId,

  token,
}: IGetSingleDeptProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["single-department", departmentId],
    () =>
      getSingleDepartment({
        companyId,
        departmentId,

        token,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },

      select: (res: any) => {
        const item = res.data.data;

        const data: TDepartment = {
          id: item.id,
          name: item.name,
          email: item.email,
          employeeCount: item.employeeCount ?? 0,
          departmentHeadId: item?.departmentHeadId,
          parentDepartmentId: item?.parentDepartmentId,
        };

        return data;
      },
    }
  );

  return queryData;
};

export const useCreateDepartment = () => {
  return useMutation(createDepartment);
};
export const useUpdateDepartment = () => {
  return useMutation(updateDepartment);
};
