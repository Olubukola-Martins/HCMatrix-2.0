import { TablePaginationConfig, Tooltip } from "antd";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery, useQueryClient } from "react-query";
import { getDepartments } from "../../../../ApiRequesHelpers/Utility/departments";
import { useFetchDepartments } from "../../../../APIRQHooks/Utility/departmentHooks";
import { IAuthDets } from "../../../../AppTypes/Auth";
import { TDataView } from "../../../../AppTypes/Component";
import { TDepartment } from "../../../../AppTypes/DataEntitities";
import { GlobalContext } from "../../../../Contexts/GlobalContextProvider";
import { ErrorComponent } from "../../../../GeneralComps/ErrorComps";
import { DataContainerLoader } from "../../../../GeneralComps/LoaderComps";
import { openNotification } from "../../../../NotificationHelpers";
import { DepartmentsGridView } from "./DepartmentsGridView";
import { DepartmentsTableView } from "./DepartmentsTableView";

const DepartmentsViewContainer = () => {
  const [viewId, setViewId] = useState<TDataView>("list");
  const handleViewId = (val: TDataView) => {
    setViewId(val);
  };
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: false,
  });

  const offset =
    pagination.current && pagination.current !== 1
      ? (pagination.pageSize ?? 4) * (pagination.current - 1)
      : 0;

  const onChange = (newPagination: TablePaginationConfig | number) => {
    if (typeof newPagination === "number") {
      setPagination((val) => ({
        ...val,
        current: newPagination,
      }));
    } else {
      setPagination((val) => ({
        ...val,
        current: newPagination.current,
      }));
    }
  };
  const {
    data: departmentData,
    isError,
    isFetching,
    isSuccess,
  } = useFetchDepartments({
    token,
    companyId,
    pagination: {
      limit: pagination.pageSize,
      offset,
      current: pagination.current,
    },
  });

  // to be able to maitain diff page size per diff view
  useEffect(() => {
    if (viewId === "grid") {
      setPagination((val) => ({ ...val, pageSize: 10, current: 1 }));
    } else {
      setPagination((val) => ({ ...val, pageSize: 5, current: 1 }));
    }
  }, [viewId]);

  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="view-toggler flex rounded overflow-hidden items-center">
        <Tooltip title="Grid View">
          <i
            onClick={() => handleViewId("grid")}
            className={
              viewId === "grid"
                ? "ri-layout-grid-fill text-base text-white bg-caramel px-2 border cursor-pointer"
                : "ri-layout-grid-fill text-base text-black bg-white px-2 border cursor-pointer"
            }
            aria-hidden="true"
          ></i>
        </Tooltip>

        <Tooltip title="List View">
          <i
            className={
              viewId === "list"
                ? "ri-list-unordered text-base text-white bg-caramel px-2 border cursor-pointer"
                : "ri-list-unordered text-base text-black bg-white px-2 border cursor-pointer"
            }
            onClick={() => handleViewId("list")}
            aria-hidden="true"
          ></i>
        </Tooltip>
      </div>
      <div className="content overflow-y-hidden relative">
        {!isSuccess && !isError && <DataContainerLoader />}
        {isError && (
          <ErrorComponent
            message="Oops! Something went wrong."
            supportText="Please check back in a minute"
          />
        )}
        {viewId === "grid" && isSuccess && (
          <DepartmentsGridView
            departments={departmentData.data}
            loading={isFetching}
            pagination={{ ...pagination, total: departmentData.total }}
            onChange={onChange}
          />
        )}

        {viewId === "list" && isSuccess && (
          <DepartmentsTableView
            departments={departmentData.data}
            loading={isFetching}
            pagination={{ ...pagination, total: departmentData.total }}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

export default DepartmentsViewContainer;
