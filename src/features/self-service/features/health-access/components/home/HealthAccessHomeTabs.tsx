import { Tabs } from "antd";
import HospitalContainer from "../settings/hospital/HospitalContainer";
import EmployeeHealthAccessContainer from "../employee/EmployeeHealthAccessContainer";

const HealthAccessHomeTabs = () => {
  return (
    <Tabs
      items={[
        {
          label: "My Health Access",
          key: "My Health Access",
        },
        {
          label: "Registered Employees",
          key: "Registered Employees",
          children: <EmployeeHealthAccessContainer />,
        },
        {
          label: "Available Hospitals",
          key: "Available Hospitals",
          children: <HospitalContainer type="mine" />,
        },
      ]}
    />
  );
};

export default HealthAccessHomeTabs;
