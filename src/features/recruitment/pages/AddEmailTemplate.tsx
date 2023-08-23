import { Form, Input, Select } from "antd";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import JoditEditorComponent from "../components/JoditEditor";
import { AppButton } from "components/button/AppButton";

const AddEmailTemplate = () => {
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    console.log(editorContent);
  };
  const handleSubmit = (values: any) => {
    console.log("Received values of form:", values);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <RecruitmentSettingsIntro
        title="New Email Template"
        description={""}
        nextLink={appRoutes.recruitmentEmailTemplate}
      />
      <div className="Container mt-5">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <h2 className="text-xl py-2 font-nedium">
            Template Name <span className="text-red-600">*</span>
          </h2>
          <Form.Item
            name="jobName"
            rules={[{ required: true, message: "Job Name is required" }]}
            className="w-56"
          >
            <Input />
          </Form.Item>

          <Form.Item name="jobName" className="font-medium text-xl">
            <JoditEditorComponent
              value={editorContent}
              onChange={handleEditorChange}
            />
          </Form.Item>
          <div className="w-full inline-flex justify-end gap-5">
            <button
              className="text-base text-caramel underline underline-offset-4 hover:no-underline font-medium"
              type="reset"
            >
              Cancel
            </button>
            <Form.Item className="mt-5">
              <AppButton type="submit" label="Save template" />
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddEmailTemplate;
