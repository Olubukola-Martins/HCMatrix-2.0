import { MailOutlined } from "@mui/icons-material";
import { Form, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import {
  forgetPassword,
  IForgotPasswordProps,
} from "../../ApiRequesHelpers/Auth/forgotPassword";
import { emailValidationRules } from "../../FormHelpers/validation";
import { openNotification } from "../../NotificationHelpers";

export const ForgotPasswordForm = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useMutation(forgetPassword);

  const handleSubmit = (data: any) => {
    const props: IForgotPasswordProps = {
      email: data.email,
    };
    mutate(props, {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },

      onSuccess: (res) => {
        const result = res.data.data;
        openNotification({
          state: "success",
          title: "Success",
          description: `Successful. Please check ${data.email} to reset your password!`,
        });
        queryClient.invalidateQueries({
          queryKey: ["forgotPassword"],
          exact: true,
        });
        form.resetFields();
      },
    });
  };

  return (
    <Form onFinish={handleSubmit} form={form}>
      <Form.Item name="email" rules={emailValidationRules}>
        <Input
          prefix={<MailOutlined className="site-form-item-icon pr-1" />}
          placeholder="Employee ID or Work Email"
          className="rounded border-slate-400"
          style={{ padding: "6px 5px" }}
        />
      </Form.Item>
      <button
        className="authBtn w-full mt-4 mb-3"
        type="submit"
        // disabled={isLoading}
      >
        {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
      </button>
    </Form>
  );
};