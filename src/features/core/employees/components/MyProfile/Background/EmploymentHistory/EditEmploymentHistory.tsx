import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  dateHasToBeLesserThanOrEqualToCurrentDayRuleForRange,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { TSingleEmployee } from "features/core/employees/types";
import { useUpdateEmployeeEmploymentHistory } from "features/core/employees/hooks/employmentHistory/useUpdateEmployeeEmploymentHistory";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

interface IProps extends IModalProps {
  employeeId: number;
  history: TSingleEmployee["employmentHistory"][0];
}

export const EditEmploymentHistory: React.FC<IProps> = ({
  open,
  handleClose,
  employeeId,
  history,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateEmployeeEmploymentHistory();
  useEffect(() => {
    form.setFieldsValue({
      organization: history.organization,
      position: history.position,
      duration: [moment(history.startDate), moment(history.endDate)],
    });
  }, [form, history]);

  const handleSubmit = (data: any) => {
    mutate(
      {
        employeeId,
        employmentHistoryId: history.id,
        data: {
          endDate: data.duration[1].toString(),
          startDate: data.duration[0].toString(),
          organization: data.organization,
          position: data.position,
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
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
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Edit Employment History"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="organization"
          label="Organization"
          rules={textInputValidationRules}
        >
          <Input
            className="generalInputStyle"
            placeholder="Enter Organization"
          />
        </Form.Item>
        <Form.Item
          name="position"
          label="Position"
          rules={textInputValidationRules}
        >
          <Input className="generalInputStyle" placeholder="Enter Position" />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={[dateHasToBeLesserThanOrEqualToCurrentDayRuleForRange]}
        >
          <DatePicker.RangePicker
            placeholder={["Start Date", "End Date"]}
            format={DEFAULT_DATE_FORMAT}
            className="generalInputStyle"
          />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
