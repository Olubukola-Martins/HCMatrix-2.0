import { Form, Input, InputNumber, Modal, Slider } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

import { QUERY_KEY_FOR_NSITF_AUTHORITY } from "features/payroll/hooks/organization/nsitfAuthorities/useGetNSITFAuthorities";
import { useAddNSITFAuthority } from "features/payroll/hooks/organization/nsitfAuthorities/useAddNSITFAuthority";

const AddNSITFAuth: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddNSITFAuthority();

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
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
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_NSITF_AUTHORITY],
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
      title={"Add NSITF Authority"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

export default AddNSITFAuth;
