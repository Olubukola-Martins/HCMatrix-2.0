import { Select, Spin } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useFetchVehicles } from "../hooks/useFetchVehicles";

export const FormVehicleInput: React.FC<{
  Form: any;
  showLabel?: boolean;
}> = ({ Form, showLabel = true }) => {
  const { token, companyId } = useApiAuth();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching, isSuccess } = useFetchVehicles({
    companyId,
    searchParams: {
      name: debouncedSearchTerm,
    },
    pagination: {
      limit: 100,
      offset: 0,
    },

    token,
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name="vehicleId"
      label={showLabel ? "Vehicle" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select vehicle"
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
            <Select.Option key={item.id} value={item.id} className="capitalize">
              {item.brand} {item.type} ({item.plateNumber})
            </Select.Option>
          ))
        ) : (
          <Select.Option key={"loading"} value={""} disabled>
            <div className="flex justify-center items-center w-full">
              <Spin size="small" />
            </div>
          </Select.Option>
        )}
      </Select>
    </Form.Item>
  );
};