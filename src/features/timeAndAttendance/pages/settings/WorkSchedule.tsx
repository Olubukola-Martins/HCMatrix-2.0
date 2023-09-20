import { Skeleton } from "antd";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { WeeklyWork } from "features/timeAndAttendance/components/settings/WeeklyWork";
import { WorkBreak } from "features/timeAndAttendance/components/settings/WorkBreak";
import { WorkFixed } from "features/timeAndAttendance/components/settings/WorkFixed";
import { WorkFlexible } from "features/timeAndAttendance/components/settings/WorkFlexible";
import { WorkShift } from "features/timeAndAttendance/components/settings/WorkShift";
import { useGetWorkSchedule } from "features/timeAndAttendance/hooks/useGetWorkSchedule";
import { useState } from "react";

const boxStyle =
  "border py-3 px-7 text-accent font-medium text-base cursor-pointer";
export const WorkSchedule = () => {
  const { data, isLoading } = useGetWorkSchedule();
  const [switchWorkArr, setSwitchWorkArr] = useState(
    data ? data?.workArrangement : "Fixed"
  );
 
  return (
    <>
      <TimeAttendanceSettingsNav active="Create Work Schedule" />
      <AttendanceSettingsIntro
        title={"Create Work Schedule"}
        description="Plan work by setting your team's work and break time. Manage overtime rules in settings"
      />

      <div className="Container mt-7">
        <div className="border rounded-md px-3 md:pl-5 py-4">
          <div className="max-w-2xl">
            <div>
              <h3 className="font-semibold text-lg">Schedule</h3>
              <div className="flex items-center flex-wrap gap-3 mb-5">
                <h4 className="text-base font-medium">Work arrangement</h4>
                <div className="flex items-center flex-wrap">
                  <div
                    onClick={() => setSwitchWorkArr("Fixed")}
                    className={
                      switchWorkArr === "Fixed"
                        ? `${boxStyle} bg-caramel rounded-l`
                        : `${boxStyle} rounded-l`
                    }
                  >
                    <h5>Fixed</h5>
                  </div>
                  <div
                    onClick={() => setSwitchWorkArr("Flexible")}
                    className={
                      switchWorkArr === "Flexible"
                        ? `${boxStyle} bg-caramel`
                        : `${boxStyle}`
                    }
                  >
                    <h5>Flexible</h5>
                  </div>
                  <div
                    onClick={() => setSwitchWorkArr("Weekly")}
                    className={
                      switchWorkArr === "Weekly"
                        ? `${boxStyle} bg-caramel`
                        : `${boxStyle}`
                    }
                  >
                    <h5>Weekly</h5>
                  </div>
                  <div
                    onClick={() => setSwitchWorkArr("Shift")}
                    className={
                      switchWorkArr === "Shift"
                        ? `${boxStyle} bg-caramel`
                        : `${boxStyle}`
                    }
                  >
                    <h5>Shift</h5>
                  </div>
                  <div
                    onClick={() => setSwitchWorkArr("break")}
                    className={
                      switchWorkArr === "break"
                        ? `${boxStyle} rounded-r bg-card shadow`
                        : `${boxStyle} rounded-r bg-card shadow`
                    }
                  >
                    <h5 className="text-caramel">Break</h5>
                  </div>
                </div>
              </div>
              {/* Initialization of the components */}
              <Skeleton active loading={isLoading}>
                {switchWorkArr === "Fixed" && <WorkFixed data={data} />}
                {switchWorkArr === "Flexible" && <WorkFlexible data={data} />}
                {switchWorkArr === "Weekly" && <WeeklyWork data={data} />}
              </Skeleton>

              {switchWorkArr === "Shift" && <WorkShift data={data} />}
            </div>
          </div>
        </div>
        {switchWorkArr === "break" && <WorkBreak />}
      </div>
    </>
  );
};
