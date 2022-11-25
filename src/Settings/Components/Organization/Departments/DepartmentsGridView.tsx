import React from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TDepartment } from "../../../../AppTypes/DataEntitities";
import { Pagination, TableProps, TablePaginationConfig } from "antd";

interface IProps {
  departments: TDepartment[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TDepartment>["onChange"];
}

export const DepartmentsGridView = ({
  departments,
  loading,
  pagination,
  onChange,
}: IProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {departments.map((item) => (
          <DepartmentBox key={item.id} department={item} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination {...pagination} />
      </div>
    </div>
  );
};

const DepartmentBox = ({ department }: { department: TDepartment }) => {
  return (
    <>
      {/* view */}

      <div className="border px-4 py-2 rounded-lg grid grid-cols-1 gap-4 border-caramel">
        <div className="flex justify-between">
          <h6 className="text-xl font-thin capitalize">{department.name}</h6>

          <i className="fa-solid fa-ellipsis"></i>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">{department.email}</p>
          <div className="rounded-full bg-caramel h-6 w-6 flex items-center justify-center ">
            <span className="text-sm">{department.employeeCount}</span>
          </div>
        </div>
      </div>
    </>
  );
};