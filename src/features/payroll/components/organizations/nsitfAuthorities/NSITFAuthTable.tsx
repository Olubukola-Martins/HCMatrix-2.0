import { Button } from "antd";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { TTaxAuthority } from "features/payroll/types";
import moment from "moment";
import { TableWithFocusType } from "components/table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteNSITFAuth from "./DeleteNSITFAuth";
import EditNSITFAuth from "./EditNSITFAuth";
import { useGetNSITFAuthorities } from "features/payroll/hooks/organization/nsitfAuthorities/useGetNSITFAuthorities";

type TAction = "edit" | "delete";

const NSITFAuthTable: React.FC<{
  categoryId?: number;
}> = ({ categoryId }) => {
  const [action, setAction] = useState<TAction>();
  const [taxAuth, setTaxAuth] = useState<TTaxAuthority>();
  const handleAction = ({
    action,
    data,
  }: {
    action: TAction;
    data: TTaxAuthority;
  }) => {
    setAction(action);
    setTaxAuth(data);
  };
  const cancelAction = () => {
    setAction(undefined);
    setTaxAuth(undefined);
  };
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetNSITFAuthorities({
    pagination,
  });

  const columns: ColumnsType<TTaxAuthority> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item?.name}</span>,
    },

    {
      title: "Created At",
      dataIndex: "createAr",
      key: "createAr",
      render: (_, item) => moment(item.createdAt).format(`YYYY-MM-DD`),
    },
    {
      title: "Updated At",
      dataIndex: "update",
      key: "update",
      render: (_, item) => moment(item.updatedAt).format(`YYYY-MM-DD`),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <div>
          <Button
            icon={<AiFillEdit />}
            type="text"
            onClick={() => handleAction({ action: "edit", data: item })}
          />
          <Button
            icon={<AiFillDelete />}
            type="text"
            onClick={() => handleAction({ action: "delete", data: item })}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {taxAuth && (
        <EditNSITFAuth
          taxAuth={taxAuth}
          open={action === "edit"}
          handleClose={() => cancelAction()}
        />
      )}
      {taxAuth && (
        <DeleteNSITFAuth
          taxAuth={taxAuth}
          open={action === "delete"}
          handleClose={() => cancelAction()}
        />
      )}
      <TableWithFocusType
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </>
  );
};

export default NSITFAuthTable;
