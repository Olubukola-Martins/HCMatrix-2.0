import React from "react";
import { IModalProps } from "types";

import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { TSingleEmployee } from "features/core/employees/types";
import { useDeleteEmployeeEmploymentHistory } from "features/core/employees/hooks/employmentHistory/useDeleteEmployeeEmploymentHistory";

interface IProps extends IModalProps {
  history: TSingleEmployee["employmentHistory"][0];
  employeeId: number;
}
export const DeleteEmploymentHistory: React.FC<IProps> = ({
  open,
  handleClose,
  history,
  employeeId,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteEmployeeEmploymentHistory();

  const handleDelete = () => {
    mutate(
      {
        employmentHistoryId: history.id,
        employeeId,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Skill"
      entity={{
        type: `employment history at ${history.organization}`,
        name: history.position,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
