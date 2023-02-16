import { Input, Space, Table } from "antd";
import React, { useContext, useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { SaveEmploymentHistory } from "./SaveEmploymentHistory";
import { TEmployee, TEmployementHistory } from "AppTypes/DataEntitities";
import moment from "moment";
import { useDeleteEmployeeEmploymentHistory } from "APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { openNotification } from "NotificationHelpers";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { LoadingOutlined } from "@ant-design/icons";

interface IProps {
  employee?: TEmployee;
}
export const EmploymentHistory = ({ employee }: IProps) => {
  const queryClient = useQueryClient();

  const [employmentHistory, setEmploymentHistory] =
    useState<TEmployementHistory>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const editEmploymentHistory = (val: TEmployementHistory) => {
    setEmploymentHistory(val);
    setOpenDrawer(true);
  };
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const { mutate, isLoading } = useDeleteEmployeeEmploymentHistory();
  const [deleteId, setDeleteId] = useState(0);
  const deleteHistory = (historyId: number) => {
    setDeleteId(historyId);
    if (companyId && employee) {
      mutate(
        {
          companyId,

          token,
          employeeId: employee.id,
          historyId,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: ["single-employee", employee.id],
              // exact: true,
            });
            setDeleteId(0);
          },
        }
      );
    }
  };
  const columns: ColumnsType<TEmployementHistory> = [
    {
      title: "Organization",
      dataIndex: "organization",
      // width: 150,
    },
    {
      title: "Position",
      dataIndex: "position",
      // width: 150,
    },
    {
      title: "Started On",
      dataIndex: "startDate",
      render: (val) => moment(val).format("DD/MM/YYYY"),
    },
    {
      title: "Ended",
      dataIndex: "endDate",
      render: (val) => moment(val).format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <i
            className="ri-pencil-line text-xl cursor-pointer"
            onClick={() => editEmploymentHistory(record)}
          />
          {isLoading && deleteId === record.id ? (
            <LoadingOutlined />
          ) : (
            <i
              className="ri-delete-bin-line text-lg cursor-pointer"
              onClick={() => deleteHistory(record.id as number)}
            />
          )}
        </Space>
      ),
    },
  ];
  const handleClose = () => {
    setOpenDrawer(false);
    setEmploymentHistory(undefined);
  };
  return (
    <div>
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Employment History</h2>
        </div>
        <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
          <Input.Search
            placeholder="input search text"
            style={{ width: 200 }}
            className="rounded"
          />
          <div>
            <button className="button" onClick={() => setOpenDrawer(true)}>
              Add Employment History
            </button>
          </div>
        </div>

        <SaveEmploymentHistory
          open={openDrawer}
          handleClose={handleClose}
          employmentHistory={employmentHistory}
          employeeId={employee?.id}
        />

        <Table
          columns={columns}
          dataSource={employee?.employmentHistory}
          pagination={{
            pageSize: 4,
            total: employee?.employmentHistory?.length,
          }}
          scroll={{ y: 240 }}
          size={"small"}
        />
      </div>
    </div>
  );
};
