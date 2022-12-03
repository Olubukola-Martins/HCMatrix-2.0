import pagination from "antd/lib/pagination";
import { useMutation, useQuery } from "react-query";
import {
  createDesignation,
  getDesignations,
} from "../../ApiRequesHelpers/Utility/designations";
import { TDesignation } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { openNotification } from "../../NotificationHelpers";

interface IFRQDesignationsProps {
  pagination?: IPaginationProps;
  companyId: string;
}
interface IFRQDesignationsReturnProps {
  data: TDesignation[];
  total: number;
}
export const useFetchDesignations = ({
  pagination,
  companyId,
}: IFRQDesignationsProps) => {
  const queryData = useQuery(
    ["designations", pagination?.current, pagination?.limit],
    () =>
      getDesignations({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        openNotification({
          state: "error",
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
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