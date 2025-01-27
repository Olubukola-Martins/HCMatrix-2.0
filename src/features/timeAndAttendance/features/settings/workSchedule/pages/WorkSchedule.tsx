import { useState } from "react";
import { TimeAttendanceSettingsNav } from "../../components/TimeAttendanceSettingsNav";
import { AttendanceSettingsIntro } from "../../components/AttendanceSettingsIntro";
import { WorkFixed } from "../components/WorkFixed";
import { WorkFlexible } from "../components/WorkFlexible";
import { WeeklyWork } from "../components/WeeklyWork";
import { WorkShift } from "../components/WorkShift";

const boxStyle =
  "border py-3 px-7 text-accent font-medium text-base cursor-pointer";

export const WorkSchedule = () => {
  const [switchWorkArr, setSwitchWorkArr] = useState("Fixed");

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
                        ? `${boxStyle} bg-caramel rounded-r`
                        : `${boxStyle} rounded-r`
                    }
                  >
                    <h5>Shift</h5>
                  </div>
                </div>
              </div>
              {/* Initialization of the components */}

              {switchWorkArr === "Fixed" && <WorkFixed />}
              {switchWorkArr === "Flexible" && <WorkFlexible />}
              {switchWorkArr === "Weekly" && <WeeklyWork />}
            </div>
          </div>
        </div>
        {switchWorkArr === "Shift" && <WorkShift />}
      </div>
    </>
  );
};

export default WorkSchedule;
