import Table, { ColumnsType } from "antd/lib/table";
import { AttendanceSubToper } from "../components/AttendanceSubToper";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FilterTimeSheet } from "../components/FilterTimeSheet";

interface DataType {
  key: string;
  name: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  total: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (_, val) => (
      <Link to={appRoutes.timeSheetDetails(1).path}>{val.name}</Link>
    ),
  },
  {
    title: "Monday",
    dataIndex: "monday",
  },
  {
    title: "Tuesday",
    dataIndex: "tuesday",
  },
  {
    title: "Wednesday",
    dataIndex: "wednesday",
  },
  {
    title: "Thursday",
    dataIndex: "thursday",
  },
  {
    title: "Friday",
    dataIndex: "friday",
  },
  {
    title: "Saturday",
    dataIndex: "saturday",
  },
  {
    title: "Sunday",
    dataIndex: "sunday",
  },
  {
    title: "Total",
    dataIndex: "total",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Godswill Omenuko",
    friday: 3,
    monday: 2,
    saturday: 6,
    sunday: 3,
    thursday: 6,
    tuesday: 3,
    total: 10,
    wednesday: 8,
  },
  {
    key: "2",
    name: "Ruth Godwin",
    friday: 3,
    monday: 2,
    saturday: 6,
    sunday: 3,
    thursday: 6,
    tuesday: 3,
    total: 10,
    wednesday: 8,
  },
];

export const TimeSheet = () => {
  const [filterSheet, setFilterSheet] = useState(false);
  return (
    <>
      <AttendanceSubToper active="time-sheet" />
      <FilterTimeSheet
        open={filterSheet}
        handleClose={() => setFilterSheet(false)}
      />
      <div className="Container">
        <PageIntro title="Timesheet" link={appRoutes.attendanceHome} />
        <p className="pt-2">
          Welcome on board, here is a detailed list of clocked work hours and
          breaks of all employee.
        </p>

        <div className="flex justify-between items-center mt-10 mb-7">
          <Input.Search
            placeholder="Search branch"
            style={{ width: "35%" }}
            allowClear
          />
          <div className="flex items-center gap-x-3">
            <button
              className="flex items-center gap-x-2 transparentButton"
              onClick={() => setFilterSheet(true)}
            >
              <span className="text-caramel font-medium">Filter</span>
              <i className="ri-filter-2-line text-caramel"></i>
            </button>
            <Link className="button" to={appRoutes.uploadAttendance}>
              Upload Timesheet
            </Link>
          </div>
        </div>

        {/* <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <Select
            defaultValue="Weekly"
            style={{ width: 120 }}
            options={[{ value: "weekly", label: "weekly" }]}
          />
          <AppButton
            label="Feb 27-Mar 5"
            additionalClassNames={[" transparentButton text-accent"]}
          />
        </div>
        <div className="flex items-center gap-3">
          <Select
            defaultValue="Tracked hours"
            style={{ width: 150 }}
            options={[{ value: "hours", label: "hours" }]}
          />
          <Select
            defaultValue="Status"
            style={{ width: 120 }}
            options={[{ value: "hours", label: "hours" }]}
          />
          <Select
            defaultValue="Clocked in"
            style={{ width: 120 }}
            options={[{ value: "hours", label: "hours" }]}
          />
        </div>
      </div> */}

        <Table columns={columns} dataSource={data} scroll={{ x: 500 }} />
      </div>
    </>
  );
};
