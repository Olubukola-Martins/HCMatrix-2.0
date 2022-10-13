import { Popover } from "@mui/material";
import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import Themes from "../../../Themes/Themes";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import EntryBoxes from "../../Components/Utilities/EntryBoxes";
import LeaveHistoryTable from "../../Components/Leave/LeaveHistoryTable";
import LeaveHomePageHeader from "../../Components/Leave/LeaveHomePageHeader";

const leaveCards = [
  { title: "Spill over", isLink: true, info: "0 Days" },
  { title: "Leave Bank", isLink: false, info: "0 Days" },
  { title: "Used Leave", isLink: false, info: "0 Days" },
  { title: "Leave Balance", isLink: false, info: "0 Days" },
  { title: "Approved Requests", isLink: false, info: "0" },
  { title: "Pending Requests", isLink: false, info: "0" },
  { title: "Rejected Requests", isLink: false, info: "0" },
  { title: "Recognized Public Holidays", isLink: false, info: "0 Days" },
];

const LeaveHome = () => {
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <div>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="relative right-0 left-0 top-0 -mt-7"
        >
          <path
            fill="var(--card)"
            fill-opacity="1"
            d="M0,160L20,165.3C40,171,80,181,120,165.3C160,149,200,107,240,122.7C280,139,320,213,360,224C400,235,440,181,480,160C520,139,560,149,600,181.3C640,213,680,267,720,266.7C760,267,800,213,840,176C880,139,920,117,960,122.7C1000,128,1040,160,1080,176C1120,192,1160,192,1200,197.3C1240,203,1280,213,1320,234.7C1360,256,1400,288,1420,304L1440,320L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"
          ></path>
        </svg> */}

        <div className="Container">
          {/* header */}
          <LeaveHomePageHeader />

          {/* cards */}

          <EntryBoxes entries={leaveCards} />

          {/* table section*/}
          <div className="mt-4">
            <LeaveHistoryTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaveHome;
