import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { WeeklyWork } from "features/timeAndAttendance/components/settings/WeeklyWork";
import { WorkBreak } from "features/timeAndAttendance/components/settings/WorkBreak";
import { WorkFixed } from "features/timeAndAttendance/components/settings/WorkFixed";
import { WorkFlexible } from "features/timeAndAttendance/components/settings/WorkFlexible";
import { WorkShift } from "features/timeAndAttendance/components/settings/WorkShift";
import { useState } from "react";

export const WorkSchedule = () => {
  const [switchWorkArr, setSwitchWorkArr] = useState("fixed");
  const boxStyle =
    "border py-3 px-7 text-accent font-medium text-base cursor-pointer";
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
                    onClick={() => setSwitchWorkArr("fixed")}
                    className={
                      switchWorkArr === "fixed"
                        ? `${boxStyle} bg-caramel rounded-l`
                        : `${boxStyle} rounded-l`
                    }
                  >
                    <h5>Fixed</h5>
                  </div>
                  <div
                    onClick={() => setSwitchWorkArr("flexible")}
                    className={
                      switchWorkArr === "flexible"
                        ? `${boxStyle} bg-caramel`
                        : `${boxStyle}`
                    }
                  >
                    <h5>Flexible</h5>
                  </div>
                  <div
                    onClick={() => setSwitchWorkArr("weekly")}
                    className={
                      switchWorkArr === "weekly"
                        ? `${boxStyle} bg-caramel`
                        : `${boxStyle}`
                    }
                  >
                    <h5>Weekly</h5>
                  </div>
                  <div
                    onClick={() => setSwitchWorkArr("shift")}
                    className={
                      switchWorkArr === "shift"
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
              {switchWorkArr === "fixed" && <WorkFixed />}
              {switchWorkArr === "flexible" && <WorkFlexible />}
              {switchWorkArr === "weekly" && <WeeklyWork />}
              {switchWorkArr === "shift" && <WorkShift />}
            </div>
          
          </div>
        </div>
        {switchWorkArr === "break" && <WorkBreak />}
      </div>
    </>
  );
};
