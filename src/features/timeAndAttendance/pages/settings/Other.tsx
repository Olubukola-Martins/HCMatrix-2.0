import { Form, Input, InputNumber, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { useCreateOtherSettings } from "features/timeAndAttendance/hooks/useCreateOtherSettings";
import { useGetOtherSettings } from "features/timeAndAttendance/hooks/useGetOtherSettings";
import { QUERY_KEY_FOR_COMPANY_POLICY } from "features/timeAndAttendance/hooks/useGetTimeTrackingRule";
import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { generalValidationRules, textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
const formWrapStyle =
  "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
export const Other = () => {
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const { data, isLoading, isSuccess } = useGetOtherSettings();
  const { mutate, isLoading: isLoadingPost } = useCreateOtherSettings();
  const queryClient = useQueryClient();

  console.log(data);
  

  useEffect(() => {
    if (isSuccess && data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data, isSuccess, form]);

  const onSubmit = (values: any) => {
    mutate(
      {
        ...values,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 7.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
            duration: 4,
          });
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_COMPANY_POLICY]);
        },
      }
    );
  };

  return (
    <div>
      <TimeAttendanceSettingsNav active="other settings" />
      <AttendanceSettingsIntro
        title={"Other settings"}
        description="Complete the following settings"
      />
      <div className="Container mt-7">
        <div className="bg-card rounded md:p-5 p-3">
          <div className="bg-mainBg py-4 px-4 rounded">
            <h3 className="font-medium text-base pb-3 pt-1">
              Attendance settings
            </h3>
            <Form
              layout="vertical"
              onFinish={onSubmit}
              initialValues={{ isSoftClockInEnabled: true }}
              form={form}
              disabled={isLoading}
            >
              <div className={formWrapStyle}>
                <FormWorkflowInput
                  Form={Form}
                  control={{
                    label: "Select manual Attendance workflow",
                    name: "attendanceWorkFlowId",
                  }}
                />
                <FormWorkflowInput
                  Form={Form}
                  control={{
                    label: "Select overtime confirmation workflow",
                    name: "overtimeConfirmationWorkflowId",
                  }}
                />
              </div>
              <div className={formWrapStyle}>
                <Form.Item name="longitude" label="Company longitude" rules={textInputValidationRules}>
                  <Input placeholder="00.00" className="w-full" />
                </Form.Item>
                <Form.Item name="latitude" label="Company latitude" rules={textInputValidationRules}>
                  <Input placeholder="0.0" className="w-full" />
                </Form.Item>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  className={`${formWrapStyle} flex justify-between items-center`}
                >
                  <h3>Enforce Geofence on soft clock-in</h3>
                  <Form.Item
                    name="enforceGeoFencing"
                    className="flex justify-end items-end"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </div>
                <div
                  className={`${formWrapStyle} flex justify-between items-center`}
                >
                  <h3>Enforce Strict Distance</h3>
                  <Form.Item
                    name="enforceStrictDistance"
                    className="flex justify-end items-end"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </div>
              </div>
              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <Form.Item
                  name="geoFencingRadius"
                  label="Allow clock-in distance from company (km)"
                  rules={generalValidationRules}
                >
                  <InputNumber className="w-full" placeholder="0.00" />
                </Form.Item>
              </div>
              <div className="flex justify-end my-2">
                <AppButton
                  label="Save"
                  type="submit"
                  isLoading={isLoadingPost}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
