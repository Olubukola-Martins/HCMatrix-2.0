import Search from "antd/lib/input/Search";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

interface DataType {
  key: React.Key;
  name: string;
  completionDate: string;
  approvedBy: string;
  approvedOn: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name of Training",
    dataIndex: "name",
  },

  {
    title: "Date of Completion",
    dataIndex: "completionDate",
  },

  {
    title: "Rating",
    dataIndex: "rating",
  },
];

const data: DataType[] = [];
// for (let i = 0; i < 10; i++) {
//   data.push({
//       key: i,
//       name: "",
//       completionDate: "",
//       rating: "",
//   });
// }

export const TrainingHistory = () => {
  return (
    <div>
      <div className="bg-card p-3">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Training History</h2>
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
