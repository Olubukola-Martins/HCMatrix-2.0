import { Drawer, Form, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { useState } from "react";
import { IDrawerProps } from "types";
import { scheduleFilterProps } from "../types";
import { openNotification } from "utils/notifications";

interface FilterShiftPerEmployeeProps extends IDrawerProps {
  setFilterData: React.Dispatch<
    React.SetStateAction<scheduleFilterProps | undefined>
  >;
}

export const FilterScheduledEmp = ({
  handleClose,
  open,
  setFilterData,
}: FilterShiftPerEmployeeProps) => {
  const [form] = Form.useForm();
  const [empUid, setEmpUid] = useState<string>();

  const onSubmit = (value: any) => {
    if (value.employeeId || value.shiftTypes) {
        setFilterData({
          empUid: empUid,
          shiftTypes: value.shiftTypes,
        })
        handleClose();
        form.resetFields();
    } else {
      openNotification({
        state: "error",
        title: "Error",
        description: "Please filter with at least 1 value",
        duration: 4.5,
      });
    }
  };

  return (
    <Drawer title="Filter" open={open} onClose={() => handleClose()}>
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <FormEmployeeInput
          Form={Form}
          optional={true}
          handleSelect={(_, val) => setEmpUid(val?.empUid)}
        />
        <Form.Item name="shiftTypes" label="Shift Type">
          <Select
            className="w-full"
            placeholder="Select"
            options={[
              { value: "morning", label: "Morning" },
              { value: "afternoon", label: "Afternoon" },
              { value: "night", label: "Night" },
            ]}
            allowClear
          />
        </Form.Item>

        <AppButton type="submit" />
      </Form>
    </Drawer>
  );
};
