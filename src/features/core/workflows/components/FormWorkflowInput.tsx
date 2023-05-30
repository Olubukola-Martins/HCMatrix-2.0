import { Select, Spin } from "antd";
import { useDebounce } from "hooks/useDebounce";

import React, { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useFetchAllWorkflows } from "../hooks/useFetchAllWorkflows";

export const FormWorkflowInput: React.FC<{
  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching, isSuccess } = useFetchAllWorkflows({
    searchParams: {
      name: debouncedSearchTerm,
    },
    pagination: {
      offset: 0,
      limit: 40,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "workflowId"}
      label={showLabel ? control?.label ?? "Workflow" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select Workflow"
        loading={isFetching} //TO DO : this should be added to all custom Fetch Form Inputs
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
      >
        {isSuccess ? (
          data.data.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))
        ) : (
          <Select.Option
            className="flex justify-center items-center w-full"
            key="_"
            disabled
          >
            <Spin size="small" />
          </Select.Option>
        )}
      </Select>
    </Form.Item>
  );
};