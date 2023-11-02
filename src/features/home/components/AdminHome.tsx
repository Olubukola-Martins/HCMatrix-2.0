import { Affix, Skeleton, Tabs } from "antd";
import { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import "../style/style.css";
import { IAuthDets } from "features/authentication/types";
import { settingNavItems } from "features/settings/constants/settingNavItems";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import EmployeeInfoChart from "features/core/employees/components/EmployeeInfoChart";
import { Celebrations } from "./Celebrations";
import { PendingItem } from "./PendingItem";
import { DoughnutChart } from "components/charts/DoughnutChart";
import { LeaveWhoIsOut } from "./whoIsOut/LeaveWhoIsOut";
import { RemoteWhoIsOut } from "./whoIsOut/RemoteWhoIsOut";
import { useGetCompanyOwnerDashboard } from "features/core/company/hooks/dashboard/useGetCompanyOwnerDashboard";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import moment, { Moment } from "moment";
import { appRoutes } from "config/router/paths";

export const AdminHome = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails?.user;
  const [openId, setOpenId] = useState("");

  const handlePendingClick = (val: string) => {
    setOpenId((preVal) => (preVal === val ? "" : val));
  };

  const globalCtx = useContext(GlobalContext);

  const { dispatch: globalDispatch } = globalCtx;
  const handleGetStarted = () => {
    globalDispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
  };
  const [year, setYear] = useState<Moment | null>(moment());

  const { data, isError, isLoading, error } = useGetCompanyOwnerDashboard({
    year: year?.format("YYYY"),
  });
  return (
    <ErrorBoundary>
      <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
        {/* TODO: For every error wrapper, ensure to display error message from server, like below */}
        <ErrorWrapper
          isError={isError}
          message={
            error?.response.data.message ?? error?.response.data.error.message
          }
        >
          <>
            <div className="Container">
              <div className="flex items-center justify-between mt-2">
                <h1 className="text-xl md:text-2xl font-black">
                  Welcome {user.fullName} ,
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 mt-6">
                <div className="md:col-span-3">
                  <div className="shadow rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base text-gray-500">
                        Total Employee
                      </h4>
                      <h2 className="font-semibold text-base md:text-lg">
                        {pluralOrSingular({
                          amount: data?.employee.total ?? 0,
                          singular: "employee",
                          plural: "employees",
                        })}
                      </h2>
                    </div>
                    <div className="flex justify-center">
                      <div
                        style={{ height: "200px", width: "200px" }}
                        className="mt-4 mb-5"
                      >
                        <DoughnutChart
                          data={[
                            data?.employee.male ?? 0,
                            data?.employee.female ?? 0,
                          ]}
                          labels={[]}
                          dataEntityLabel="Employees"
                          bgColors={["#01966B", "#F97316"]}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="transparentButton flex items-center gap-2">
                        <div className="rounded-full h-3 w-3 bg-[#01966B]" />
                        <span>{data?.employee.male}% Male</span>
                      </button>
                      <button className="transparentButton flex items-center gap-2">
                        <div className="rounded-full h-3 w-3 bg-[#F97316]" />
                        <span>{data?.employee.female}% Female</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <div className="border shadow rounded-lg px-3 py-9 flex flex-col gap-3 text-center">
                    <h3 className="text-base text-gray-500">Attendance</h3>
                    <span className="font-medium text-xl">0</span>
                    <hr />
                    <h3 className="text-base text-gray-500">Late</h3>
                    <span className="font-medium text-xl">0</span>
                    <hr />
                    <h3 className="text-base text-gray-500">Absent</h3>
                    <span className="font-medium text-xl">0</span>
                  </div>
                </div>
                <div className="bg-card rounded-lg md:col-span-2 p-3 text-accent w-full">
                  <h5 className="font-semibold">Pending Setup</h5>
                  <div className="flex flex-col gap-5 text-sm mt-4">
                    {settingNavItems
                      .filter((item) => item.category === "basic")
                      .map((item) => (
                        <PendingItem
                          key={item.title}
                          handleClick={handlePendingClick}
                          openId={openId}
                          item={item}
                        />
                      ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 mt-7 gap-y-7 gap-x-5">
                <div className="col-span-2 bg-mainBg shadow border rounded-lg p-3 relative h-80">
                  <Affix offsetBottom={20}>
                    <button
                      className="button flex gap-2 align-center"
                      onClick={handleGetStarted}
                    >
                      <i className="ri-checkbox-circle-fill" />
                      <span>Get Started</span>
                    </button>
                  </Affix>

                  <EmployeeInfoChart
                    setYear={setYear}
                    year={year}
                    data={data?.employeesBreakdown}
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <div className="bg-mainBg shadow border rounded-lg p-3 font-medium">
                    <h5 className="">Assets Held by You</h5>
                    <div className="flex items-center justify-between mt-2">
                      <span>{data?.assets.totalCount}</span>
                      <Link
                        to={appRoutes.selfServiceAssets}
                        className="text-caramel"
                      >
                        View {">"}
                      </Link>
                    </div>
                  </div>
                  <div className="bg-mainBg shadow border rounded-lg p-3 flex-1">
                    <h3 className="text-base font-medium pb-2">
                      Pending Approval
                    </h3>
                    <hr />
                    <p className="text-center py-5 text-gray-500">
                      You have No Pending <br /> Approval
                    </p>
                  </div>
                </div>

                <div className="col-span-2 bg-mainBg shadow border rounded-lg p-3">
                  <h3 className="text-base">Who is out today?</h3>

                  <Tabs
                    defaultActiveKey="1"
                    items={[
                      {
                        key: "1",
                        label: `Leave (${data?.outToday.leave.totalCount})`,
                        children: (
                          <LeaveWhoIsOut data={data?.outToday.leave.result} />
                        ),
                      },
                      {
                        key: "2",
                        label: `Remote Work (${data?.outToday.remoteWork.totalCount})`,
                        children: (
                          <RemoteWhoIsOut
                            data={data?.outToday.remoteWork.result}
                          />
                        ),
                      },
                    ]}
                  />
                </div>
                <div className="bg-mainBg shadow border rounded-lg p-3">
                  <Celebrations data={data?.celebrationsAndHolidays} />
                </div>
              </div>
            </div>
          </>
        </ErrorWrapper>
      </Skeleton>
    </ErrorBoundary>
  );
};
