import {
  Button,
  Collapse,
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Skeleton,
  Spin,
} from "antd";
import { useContext } from "react";
import { useMutation } from "react-query";
import { ICreateEmpProps } from "../../../../ApiRequesHelpers/Utility/employee";
import { useFetchRoles } from "../../../../APIRQHooks/Auth/roleHooks";
import { useFetchDepartments } from "../../../../APIRQHooks/Utility/departmentHooks";
import { useFetchDesignations } from "../../../../APIRQHooks/Utility/designationHooks";
import { useCreateEmployee } from "../../../../APIRQHooks/Utility/employees";
import { GlobalContext } from "../../../../Contexts/GlobalContextProvider";
import {
  generalValidationRules,
  textInputValidationRules,
} from "../../../../FormHelpers/validation";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { openNotification } from "../../../../NotificationHelpers";
const { Panel } = Collapse;
const { Option } = Select;

const jobRoles = ["Payroll Approval"];
const lineMgt = ["Godswill Omenuko", "Isaac Odeh"];

export const AddEmployee = () => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const [form] = Form.useForm();
  const { mutate } = useCreateEmployee();
  const {
    data: degData,
    isSuccess: isDSuccess,
    isFetching: isDFetching,
  } = useFetchDesignations({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
  });
  const {
    data: roleData,
    isSuccess: isRSuccess,
    isFetching: isRFetching,
  } = useFetchRoles({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
  });

  const handleAction = (
    action: "onboarding" | "complete-profile" | "add-another"
  ) => {
    switch (action) {
      case "complete-profile":
        form.submit();

        break;
      case "add-another":
        form.submit();

        break;
      case "onboarding":
        form.submit();

        break;

      default:
        break;
    }
  };

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: ICreateEmpProps = {
        companyId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        hasSelfService: data.hasSelfService,
        empUid: data.empUid,
        roleId: data.roleId,
        designationId: data.designationId,
        jobInformation: {
          startDate: data.startDate.format("YYYY-MM-DD"),
          jobTitle: data.jobTitle,
          monthlyGross: data.monthlyGross,
          employmentType: data.employmentType,
          workModel: data.workModel,
          numberOfDaysPerWeek: data.numberOfDaysPerWeek,
          departmentId: data.departmentId,
        },
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
        },
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="Container">
        <PageIntro title="Add Employee" link="/settings/employees" />

        <div className="bg-card px-1 md:px-5 py-7 rounded-md mt-7 text-accent">
          <div className="bg-red-200 text-sm rounded-md py-2 flex justify-between items-center px-3 mb-4">
            <span>Employees Added: 2</span>
            <span>License count left: 5</span>
          </div>
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
            initialValues={{
              hasSelfService: true,
            }}
            form={form}
          >
            <div className="bg-mainBg rounded-md md:px-4 pt-4 pb-4 shadow-sm mt-8">
              <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
                <Panel
                  header="Basic Information"
                  key="1"
                  className="collapseHeader"
                >
                  <div className="bg-card px-3 py-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-x-5">
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={textInputValidationRules}
                    >
                      <Input placeholder="Enter First Name" />
                    </Form.Item>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={textInputValidationRules}
                    >
                      <Input placeholder="Enter Last Name" />
                    </Form.Item>
                    <Form.Item
                      name="empUid"
                      label="Employee ID"
                      requiredMark="optional"
                    >
                      <Input placeholder="Employee ID" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Employee Email"
                      rules={[
                        {
                          required: true,
                          message: "Field is required",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Email" />
                    </Form.Item>
                  </div>
                </Panel>
              </Collapse>
            </div>

            <div className="bg-mainBg rounded-md md:px-4 pt-4 pb-3 shadow-sm mt-8">
              <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
                <Panel
                  header="Job Information"
                  key="1"
                  className="collapseHeader"
                >
                  <Skeleton
                    active
                    loading={
                      !isDSuccess || isDFetching || !isRSuccess || isRFetching
                    }
                  >
                    {isDSuccess && isRSuccess && (
                      <div className="bg-card px-3 py-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-x-5">
                        <Form.Item
                          name="startDate"
                          label="Start Date"
                          rules={generalValidationRules}
                        >
                          <DatePicker format="YYYY/MM/DD" className="w-full" />
                        </Form.Item>

                        <Form.Item
                          name="roleId"
                          label="Role"
                          rules={generalValidationRules}
                        >
                          <Select
                            showSearch
                            allowClear
                            optionLabelProp="label"
                            className="SelectTag w-full"
                            placeholder="Select Role"
                            options={roleData.data.map((item) => ({
                              label: item.name,
                              value: item.id,
                            }))}
                          />
                        </Form.Item>
                        <Form.Item
                          name="monthlyGross"
                          label="Monthly Gross"
                          rules={textInputValidationRules}
                        >
                          <Input placeholder="Enter monthly gross" />
                        </Form.Item>
                        <Form.Item
                          name="employmentType"
                          label="Employment Type"
                          rules={generalValidationRules}
                        >
                          <Select
                            className="SelectTag w-full"
                            placeholder="Select Employment Type"
                          >
                            <Option value="full-time">Full time</Option>
                            <Option value="part-time">Part time</Option>
                            <Option value="contract">Contract</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="workModel"
                          label="Work Model"
                          rules={generalValidationRules}
                        >
                          <Select
                            className="SelectTag w-full"
                            placeholder="Select Work Model"
                          >
                            <Option value="on-Site">On-Site</Option>
                            <Option value="hybrid">Hybrid</Option>
                            <Option value="remote">Remote</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="lineManager"
                          label="Line Manager"
                          requiredMark="optional"
                        >
                          <Select
                            showSearch
                            allowClear
                            optionLabelProp="label"
                            className="SelectTag w-full"
                            placeholder="Select Line Manager"
                          >
                            {lineMgt.map((data) => (
                              <Option key={data} value={data} label={data}>
                                {data}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="designationId"
                          label="Designation"
                          rules={generalValidationRules}
                        >
                          <Select
                            showSearch
                            allowClear
                            optionLabelProp="label"
                            className="SelectTag w-full"
                            placeholder="Select Designation"
                            options={degData.data.map((item) => ({
                              label: item.name,
                              value: item.id,
                            }))}
                          />
                        </Form.Item>
                        <Form.Item
                          name="numberOfDaysPerWeek"
                          label="Number of Days in the Week"
                        >
                          <InputNumber
                            min={1}
                            max={7}
                            className="w-full"
                            placeholder="Enter..."
                          />
                        </Form.Item>
                      </div>
                    )}
                  </Skeleton>
                </Panel>
              </Collapse>
            </div>

            <div className="bg-mainBg rounded-md md:px-4 pt-4 pb-3 shadow-sm mt-8">
              <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
                <Panel
                  header="Grant Self Service Access"
                  key="1"
                  className="collapseHeader"
                >
                  <Form.Item name="hasSelfService">
                    <Radio.Group name="hasSelfService">
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Panel>
              </Collapse>
            </div>
            <div className="flex items-center gap-3 justify-end mt-5">
              <Button type="text" onClick={() => handleAction("onboarding")}>
                Proceed to onboarding
              </Button>
              <Dropdown
                placement="top"
                overlay={
                  <ul className="bg-mainBg text-sm rounded-md font-medium shadow-md px-2 py-3 border-2">
                    <li
                      className="pb-2 cursor-pointer hover:text-caramel"
                      onClick={() => handleAction("onboarding")}
                    >
                      Save and add Another
                    </li>
                    <li
                      className=" cursor-pointer hover:text-caramel"
                      onClick={() => handleAction("onboarding")}
                    >
                      Save and Complete Profile
                    </li>
                  </ul>
                }
                trigger={["click"]}
              >
                <button
                  type="button"
                  className="flex items-center gap-2 transparentButton"
                >
                  <span>Save</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
              </Dropdown>
            </div>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};
