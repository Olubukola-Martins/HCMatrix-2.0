import { Select, Spin } from "antd";
import { generalValidationRules } from "FormHelpers/validation";
import { useDebounce } from "Hooks/useDebounce";
import React, { useState } from "react";
import { useFetchAllConferenceRooms } from "./hooks/useFetchAllConferenceRooms";

export const FormMeetingRoomsInput: React.FC<{
  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string; multiple?: boolean };
}> = ({ Form, showLabel = true, control }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching, isSuccess } = useFetchAllConferenceRooms({
    searchParams: {
      name: debouncedSearchTerm,
    },
    pagination: {
      limit: 10,
      offset: 0,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "meetingRoomId"}
      label={showLabel ? control?.label ?? "Meeting Room" : null}
      rules={generalValidationRules}
    >
      <Select
        mode={control?.multiple ? "multiple" : undefined}
        placeholder="Select Meeting Room"
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
          <div className="flex justify-center items-center w-full">
            <Spin size="small" />
          </div>
        )}
      </Select>
    </Form.Item>
  );
};
