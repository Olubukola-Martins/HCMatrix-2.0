import React from "react";
import { IModalProps } from "types";

import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TPayGradeCategory } from "features/payroll/types";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useDeletePayGradeCategory } from "features/payroll/hooks/payGrades/category/useDeletePayGradeCategory";
import { QUERY_KEY_FOR_PAY_GRADE_CATEGORIES } from "features/payroll/hooks/payGrades/category/useGetPayGradeCategories";

interface IProps extends IModalProps {
  category: TPayGradeCategory;
}
const DeletePayGradeCategory: React.FC<IProps> = ({
  open,
  handleClose,
  category,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeletePayGradeCategory();

  const handleDelete = () => {
    mutate(
      {
        id: category.id,
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
            queryKey: [QUERY_KEY_FOR_PAY_GRADE_CATEGORIES],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Pay Grade Category"
      entity={{ type: "pay grade category", name: category.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};

export default DeletePayGradeCategory;
