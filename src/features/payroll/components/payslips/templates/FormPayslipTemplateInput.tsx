import { Select, Form } from "antd";
import { useGetPayrollTemplates } from "features/payroll/hooks/templates/useGetPayrollTemplates";
import { TPayrollTemplateListData } from "features/payroll/types/template";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormPayslipTemplateInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  onSelect?: (val: number, option: TPayrollTemplateListData) => void;
  control?: { label: string; name: string | (string | number)[] };
}> = ({ Form, showLabel = true, control, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching } = useGetPayrollTemplates({
    type: "payslip",
    data: {
      searchParams: {
        name: debouncedSearchTerm,
      },
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "payslipTemplateId"}
      label={showLabel ? control?.label ?? "Payslip Template" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select Payslip Template"
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
