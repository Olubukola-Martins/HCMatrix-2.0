import { Form, Input, Select, Skeleton, Spin } from "antd";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createDepartment,
  getDepartments,
  ICreateDepProps,
} from "../../../../ApiRequesHelpers/Utility/departments";
import {
  createDesignation,
  ICreateDegProps,
} from "../../../../ApiRequesHelpers/Utility/designations";
import {
  createEmployee,
  ICreateEmpProps,
} from "../../../../ApiRequesHelpers/Utility/employee";
import { TDepartment } from "../../../../AppTypes/DataEntitities";
import { ISearchParams } from "../../../../AppTypes/Search";
import { GlobalContext } from "../../../../Contexts/GlobalContextProvider";
import {
  textInputValidationRules,
  emailValidationRules,
  generalValidationRules,
} from "../../../../FormHelpers/validation";
import { openNotification } from "../../../../NotificationHelpers";

const AddDesignationForm = ({ handleClose }: { handleClose: Function }) => {
  const queryClient = useQueryClient();
  const auth = useAuthUser();

  const authDetails = auth();

  const user = authDetails?.user;
  console.log(user, "_______");
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const [form] = Form.useForm();

  const [depSearch, setDepSearch] = useState<ISearchParams | null>(null);

  const {
    data: departments,
    isError,
    isFetching,
    isSuccess,
  } = useQuery(
    ["departments"],
    () =>
      getDepartments({
        companyId,
      }),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
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
        const result = res.data.data;
        console.log("resultx", result);

        const data: TDepartment[] = result.map(
          (item: any): TDepartment => ({
            id: item.id,
            name: item.name,
            email: item.email,
            employeeCount: item.employeeCount ?? 0,
          })
        );

        return data;
      },
    }
  );
  const { mutate, isLoading } = useMutation(createDesignation);

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: ICreateDegProps = {
        companyId,
        name: data.name,
        departmentId: data.departmentId,
      };
      console.log("prps", props, data);
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        // description: <Progress percent={80} status="active" />,
        description: <Spin />,
      });
      mutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          const result = res.data.data;

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          form.resetFields();
          handleClose();
          queryClient.invalidateQueries({
            queryKey: ["designations"],
          });
        },
      });
    }
  };
  return (
    <>
      {(!isSuccess || isFetching) && <Skeleton active />}
      {isSuccess && (
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Designation Name"
            rules={textInputValidationRules}
          >
            <Input placeholder="Designation" className="generalInputStyle" />
          </Form.Item>

          <Form.Item
            name="departmentId"
            label="Department"
            rules={generalValidationRules}
          >
            <Select
              placeholder="Department"
              className="generalInputStyle"
              options={departments.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>

          <button className="button" type="submit">
            Submit
          </button>
        </Form>
      )}
      {isError && "error illustration"}
    </>
  );
};

export default AddDesignationForm;