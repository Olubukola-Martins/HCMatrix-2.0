import React from "react";
import Themes from "../../../Themes/Themes";
import { Button, DatePicker, Form, Input, Select } from "antd";

const AddHAForEmployee = () => {
  return (
    <Form labelCol={{ span: 24 }}>
      <Form.Item label="Name">
        <Select placeholder="name">
          <Select.Option value={"James"} key={"James"}>
            James
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Plan">
        <Select placeholder="plan">
          <Select.Option value={"plana"} key={"plana"}>
            Plan B
          </Select.Option>
        </Select>
      </Form.Item>

      <div className="flex flex-row justify-between items-center mt-12">
        <Button type="text">Cancel</Button>
        <div className="flex flex-row gap-4">
          <Button type="ghost">Save And Add Another</Button>
          <Themes isBg={false}>
            <button className="button w-full" htmlType="submit">
              Submit
            </button>
          </Themes>
        </div>
      </div>
    </Form>
  );
};

export default AddHAForEmployee;