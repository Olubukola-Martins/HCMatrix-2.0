import { Select, Space, Dropdown, Menu, Table } from "antd";
import { EllipsisOutlined, MoreOutlined } from "@ant-design/icons";

const HolidaysTable = ({ data = [] }) => {
  const fdata = [
    { title: "Christmas", date: "25th, December,2020" },
    { title: "Salah", date: "18th, March,2020" },
  ];
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      // ellipsis: true,

      // width: 100,
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (val, item) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="3">View</Menu.Item>
                <Menu.Item key="2">Edit</Menu.Item>
                <Menu.Item key="1">Delete</Menu.Item>
              </Menu>
            }
            trigger={["click", "hover"]}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={fdata}
        columns={columns}
        rowSelection={{
          type: "checkbox",
          rowSelection: () => {},
        }}
        scroll={{ x: "max-content" }}
        // scroll={{ x: 500 }}
      />
    </>
  );
};

export default HolidaysTable;