import { PageIntro } from "components/layout/PageIntro";
import { AttendanceSubToper } from "../components/AttendanceSubToper";
import { appRoutes } from "config/router/paths";
import { Dropdown, Input, Menu, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import Table, { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { NewAttendanceModal } from "../components/NewAttendanceModal";

interface DataType {
  key: string;
  employee: string;
  timeIn: string;
  timeOut: string;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Employee",
    dataIndex: "employee",
  },
  {
    title: "Time in",
    dataIndex: "timeIn",
  },
  {
    title: "Time out",
    dataIndex: "timeOut",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "",
    render: (_, val) => (
      <div>
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="2">Edit</Menu.Item>
              <Menu.Item key="1">Delete</Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill"></i>
        </Dropdown>
      </div>
    ),
  },
];

export const UploadTimesheet = () => {
  const [addNewModal, setAddNewModal] = useState(false);

  return (
    <>
      <AttendanceSubToper active="time-sheet"/>
      <div className="Container">
        <NewAttendanceModal
          open={addNewModal}
          handleClose={() => setAddNewModal(false)}
        />

        <PageIntro title="Upload Attendance" link={appRoutes.attendanceHome} />
        <p className="pt-2 pb-6">
          Welcome on board, upload attendance manually
        </p>

        <Input.Search
          placeholder="Search branch"
          style={{ width: "35%" }}
          allowClear
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 mb-8">
          <div className="flex gap-3 md:justify-start justify-between">
            <Select
              defaultValue="Daily"
              style={{ width: 120 }}
              options={[{ value: "daily", label: "Daily" }]}
            />
            <AppButton
              label="Feb 27-Mar 5"
              additionalClassNames={["transparentButton"]}
            />
          </div>
          <div className="flex gap-3 md:justify-end justify-between">
            <AppButton
              variant="transparent"
              label="Add new"
              handleClick={() => setAddNewModal(true)}
            />
            <AppButton label="Add bulk" />
          </div>
        </div>

        <Table columns={columns} dataSource={[]} scroll={{ x: 500 }} />
      </div>
    </>
  );
};