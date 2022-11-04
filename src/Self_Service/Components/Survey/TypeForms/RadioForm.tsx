import { Button, Form, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import React from "react";

interface IProps {
  fields: any[];
  add: Function;
  remove: Function;
}

const RadioForm = ({ fields: rfields, add: radd, remove: rremove }: IProps) => {
  return (
    <>
      {rfields.map(({ key: rkey, name: rname, ...restField }) => (
        <Space
          key={rkey}
          style={{
            display: "flex",
            marginBottom: 8,
          }}
          align="baseline"
        >
          {/* not needed */}
          {/* <Form.Item
            {...restField}
            name={[rname, "letter"]}
            rules={[
              {
                required: true,
                message: "Missing Field name",
              },
            ]}
          >
            <Input placeholder="Field Name" />
          </Form.Item> */}
          <Form.Item
            {...restField}
            name={[rname, "value"]}
            rules={[
              {
                required: true,
                message: "Missing option",
              },
            ]}
          >
            <Input placeholder="Type option" />
          </Form.Item>

          <MinusCircleOutlined onClick={() => rremove(rname)} />
        </Space>
      ))}
      <Form.Item>
        <Button
          type="dashed"
          onClick={() => radd()}
          block
          //   disabled={percentageLeft === 100}
          icon={<PlusOutlined />}
        >
          Add Option
        </Button>
      </Form.Item>
    </>
  );
};

export default RadioForm;
