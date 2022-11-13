import Search from "antd/lib/input/Search";
import { Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

interface DataType {
  key: React.Key;
  oldGrade: string;
  newGrade: string;
  approvedBy: string;
  approvedOn: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Old Grade",
    dataIndex: "oldGrade",
  },

  {
    title: "New Grade",
    dataIndex: "newGrade",
  },

  {
    title: "Approve By",
    dataIndex: "approvedBy",
  },
  {
    title: "Approve On",
    dataIndex: "approvedOn",
  },
];

const data: DataType[] = [];
// for (let i = 0; i < 10; i++) {
//   data.push({
//       key: i,
//       oldGrade: "",
//       newGrade: "",
//       approvedBy: "",
//       approvedOn: "",
//   });
// }

export const PromotionHistory = () => {
  return (
    <div>
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Promotion History</h2>
        </div>
        <div>
          <Search
            placeholder="input search text"
            style={{ width: 200 }}
            className="rounded"
          />
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 240 }}
        />
      </div>
    </div>
  );
};
