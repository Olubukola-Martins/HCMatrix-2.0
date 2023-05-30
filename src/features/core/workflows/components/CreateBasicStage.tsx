import { Form, Input, Select, Button } from "antd";

import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { TStage, TStagingType } from "../types";
import { OptionalTypeParams } from "types/optionalTypes";
import { WORKFLOW_STAGE_TYPE_OPTIONS } from "../constants";

export const CreateBasicStage: React.FC<{
  stage: OptionalTypeParams<TStage, "entityId" | "type"> & {
    editable: boolean;
  };
  handleFinish: (data: any) => void;
  enableEdit: (id: number) => void;
  removeStage: (id: number) => void;
}> = ({ stage, handleFinish, enableEdit, removeStage }) => {
  const [form] = Form.useForm();
  const [stagingType, setStagingType] = useState<TStagingType>();
  useEffect(() => {
    if (stage) {
      form.setFieldsValue({
        name: stage.name,
        type: stage.type,
        entityId: stage.entityId,
      });
    }
  }, [form, stage]);
  return (
    <div className="flex gap-4 items-end">
      <Form
        form={form}
        onFinish={handleFinish}
        disabled={!stage.editable}
        labelCol={{ span: 24 }}
        requiredMark={false}
      >
        <div className="flex gap-4">
          <Form.Item
            name={"name"}
            label={`Stage Name`}
            rules={textInputValidationRules}
          >
            <Input placeholder="Stage name" />
          </Form.Item>
          <Form.Item
            name={"type"}
            rules={generalValidationRules}
            label="Approver Type"
          >
            <Select
              placeholder="Staging Type"
              options={WORKFLOW_STAGE_TYPE_OPTIONS}
              onSelect={(val: TStagingType) => {
                setStagingType(val);
              }}
            />
          </Form.Item>
          {stagingType === "employee" && (
            <FormEmployeeInput
              Form={Form}
              control={{ label: "Employee", name: "entityId" }}
            />
          )}
          {stagingType === "role" && (
            <FormRoleInput
              Form={Form}
              control={{ label: "Role", name: "entityId" }}
            />
          )}
          {stagingType === "group" && (
            <FormGroupInput
              Form={Form}
              control={{ label: "Group", name: "entityId" }}
            />
          )}
        </div>
      </Form>
      <div className="flex gap-4 mb-6">
        {!stage.editable ? (
          <Button icon={<EditOutlined />} onClick={() => enableEdit(stage.id)}>
            Edit
          </Button>
        ) : (
          <Button
            icon={<SaveOutlined />}
            type="text"
            onClick={() => form.submit()}
          >
            Save
          </Button>
        )}
        <Button icon={<DeleteOutlined />} onClick={() => removeStage(stage.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};