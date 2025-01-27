import { DatePicker, Form, Modal, Input, Skeleton, Select } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { IModalProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useFetchSingleDelegation } from "../hooks/useFetchSingleDelegation";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

const { RangePicker } = DatePicker;

interface IProps extends IModalProps {
  id: number;
}
export const DelegationDetail: React.FC<IProps> = ({
  open,
  handleClose,
  id,
}) => {
  const [form] = Form.useForm();

  const { data, isFetching } = useFetchSingleDelegation({ id });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        delegatee: getEmployeeFullName(data.delegatee),
        delegator: getEmployeeFullName(data.delegator),
        description: data.description,
        period: [moment(data.startDate), moment(data.endDate)],
        permissions: data.permissions.map((item) => item.permissionId),
      });
    }
  }, [data, form]);

  return (
    <Modal
      title="View Delegation"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
      style={{ top: 10 }}
    >
      <Skeleton loading={isFetching} paragraph={{ rows: 12 }}>
        <Form layout="vertical" requiredMark={false} form={form} disabled>
          <Form.Item name="delegator" label="Delegator">
            <Input />
          </Form.Item>
          <Form.Item name="delegatee" label="Delegatee">
            <Input />
          </Form.Item>

          <Form.Item
            name="period"
            label="Select Period"
            rules={generalValidationRules}
          >
            <RangePicker className="w-full" />
          </Form.Item>
          <Form.Item name="permissions" label="Permissions">
            <Select
              mode="multiple"
              className="w-full"
              options={data?.permissions.map((item) => ({
                value: item.permissionId,
                label: item.permission.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description (Optional)"
            requiredMark="optional"
          >
            <Input.TextArea
              rows={3}
              className="generalInputStyle"
              placeholder="Enter Description"
            />
          </Form.Item>
        </Form>
      </Skeleton>
    </Modal>
  );
};
