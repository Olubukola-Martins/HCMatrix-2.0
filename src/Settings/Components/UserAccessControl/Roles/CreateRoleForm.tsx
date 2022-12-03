import {
  Checkbox,
  Form,
  Input,
  Select,
  Skeleton,
  Spin,
  Typography,
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import React, { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import {
  getPermissions,
  ICreateRoleProps,
} from "../../../../ApiRequesHelpers/Auth/permissions";
import {
  useCreateRole,
  useFetchPermissions,
} from "../../../../APIRQHooks/Auth/permissionHooks";
import {
  TPermission,
  TPermissionCategory,
} from "../../../../AppTypes/DataEntitities";
import { GlobalContext } from "../../../../Contexts/GlobalContextProvider";
import {
  textInputValidationRules,
  generalValidationRules,
} from "../../../../FormHelpers/validation";
import { openNotification } from "../../../../NotificationHelpers";

const CreateRoleForm = () => {
  const queryClient = useQueryClient();

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [form] = Form.useForm();
  const {
    data,
    isError: isPError,
    isFetching: isPFetching,
    isSuccess: isPSuccess,
  } = useFetchPermissions({
    companyId,
  });

  const handleSearch = (e: any) => {
    const val = e.target.value;
    setSearchTerm(val);
  };

  const handleCategoryClick = (val: number) => {
    setSelectedCategory(val);
  };

  const { mutate, isLoading } = useCreateRole();

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: ICreateRoleProps = {
        companyId,
        name: data.name,
        permissionIds: data.permissionIds,
      };
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

          queryClient.invalidateQueries({
            queryKey: ["roles"],
          });
        },
      });
    }
  };
  return (
    <div>
      <Skeleton
        active
        loading={!isPSuccess || isPFetching}
        paragraph={{ rows: 40 }}
      >
        {isPSuccess && (
          <Form
            layout="vertical"
            requiredMark={false}
            form={form}
            onFinish={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <Typography.Title level={5}>Role name</Typography.Title>
              <Form.Item
                name="name"
                rules={textInputValidationRules}
                className="w-1/5"
              >
                <Input placeholder="role name" />
              </Form.Item>
            </div>
            <div className="flex flex-col gap-4">
              <Typography.Title level={5}>Assign Permissions</Typography.Title>
              {/* permission categories */}
              <div className="flex flex-wrap gap-4 pb-3 border-b ">
                {data.categories.map((item) => (
                  <div className="" key={item.id}>
                    <button
                      type="button"
                      className={` capitalize hover:bg-caramel hover:border-caramel focus:bg-caramel active:bg-caramel text-white block rounded-full text-sm cursor-pointer px-2 py-1 hover:text-white ${
                        item.id === selectedCategory
                          ? "bg-caramel"
                          : "bg-transparent border border-slate-400 text-slate-400"
                      }`}
                      onClick={() => handleCategoryClick(item.id)}
                    >
                      {item.name}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end my-2">
                <Input
                  onChange={handleSearch}
                  className="w-48"
                  placeholder="Search permissions"
                  disabled
                />
              </div>
              <Form.Item name="permissionIds" rules={generalValidationRules}>
                <Checkbox.Group style={{ width: "100%" }}>
                  <div className="my-6 grid grid-cols-4 gap-4">
                    {data.permissions.map((item) => (
                      <Checkbox
                        key={item.id}
                        value={item.id}
                        className={`${
                          item.categoryId === selectedCategory ||
                          selectedCategory === 0
                            ? //   ||
                              //   searchTerm
                              //     .toLowerCase()
                              //     .search(item.name.toLowerCase()) !== -1
                              "flex"
                            : "hidden"
                        }`}
                      >
                        {item.name}
                      </Checkbox>
                    ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>
            </div>

            <button className="button" type="submit" disabled={isLoading}>
              {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
            </button>
          </Form>
        )}
      </Skeleton>
    </div>
  );
};

export default CreateRoleForm;