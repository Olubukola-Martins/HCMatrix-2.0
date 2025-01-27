import { Select, Form } from "antd";
import { useFetchStates } from "hooks/useFetchStates";
import { useState } from "react";
import { TState } from "types/states";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormStateInput: React.FC<{
  handleSelect?: (val: number) => void;
  countryId?: number;
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control, countryId, handleSelect }) => {
  const [searchedData, setSearchedData] = useState<TState[]>();

  const { data, isSuccess } = useFetchStates({ countryId });

  const handleDataSearch = (val: string) => {
    if (isSuccess) {
      if (val.length > 0) {
        const sData = data.filter(
          (item) => item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
        );
        setSearchedData(sData);
      } else {
        setSearchedData([]);
      }
    }
  };
  const mainData = !!searchedData ? searchedData : data;

  return (
    <Form.Item
      name={control?.name ?? "stateId"}
      label={showLabel ? control?.label ?? "State" : null}
      rules={generalValidationRules}
      dependencies={["countryId"]}
    >
      <Select
        onSelect={handleSelect}
        showSearch
        allowClear
        onClear={() => setSearchedData([])}
        onSearch={handleDataSearch}
        className="rounded border-slate-400"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        options={mainData?.map((item) => ({
          label: `${item.name}`,
          value: item.id,
        }))}
      />
    </Form.Item>
  );
};
