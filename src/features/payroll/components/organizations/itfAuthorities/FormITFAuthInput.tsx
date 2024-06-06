import { Select, Form } from "antd";
import { useGetITFAuthorities } from "features/payroll/hooks/organization/itfAuthorities/useGetITFAuthorities";
import { TTaxAuthority } from "features/payroll/types";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormITFAuthInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  onSelect?: (val: number, option: TTaxAuthority) => void;
  control?: { label: string; name: string | (string | number)[] };
}> = ({ Form, showLabel = true, control, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching } = useGetITFAuthorities({
    searchParams: {
      name: debouncedSearchTerm,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "itfAuthId"}
      label={showLabel ? control?.label ?? "ITF Authority " : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select ITF Authority"
        loading={isFetching} //TO DO : this should be added to all custom Fetch Form Inputs
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSelect={(val: number) => {
          const grade = data?.data.find((item) => item.id === val);
          grade && onSelect?.(val, grade);
        }}
      >
        {data?.data.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
