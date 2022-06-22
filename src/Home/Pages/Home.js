import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import HomeCard from "../Components/HomeCard";
import birthDay from "../Assets/Images/birthday.svg";
import task from "../Assets/Images/task.svg";
import goals from "../Assets/Images/goals.svg";
import holiday from "../Assets/Images/holiday.svg";
import interviews from "../Assets/Images/interviews.svg";
import timesheets from "../Assets/Images/timesheets.svg";
import attendance from "../Assets/Images/attendance.svg";
import files from "../Assets/Images/files.svg";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="Container pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
          <div className="bg-card col-span-2 rounded-xl px-5 py-4">
            <h5 className="font-semibold text-accent">
              Welcome Jaleel Habibah 🖐
            </h5>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-2 text-xs text-accent">
                <i className="ri-calendar-todo-line"></i>
                <span>Feb 15, 2022</span>
              </span>
              <span className="flex items-center gap-2 text-xs text-green-700">
                <i className="ri-time-line"></i>
                <span>12:14:59 PM</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <h1 className="text-2xl font-black pb-4">Jaleel Habibah</h1>
                <ul className="flex flex-col gap-2 text-xs text-accent">
                  <li>Line manager: Godswill Laser</li>
                  <li>Email: Gworld@gmail.com</li>
                  <li>phone: +1-9034-463- 80</li>
                  <li>location: Houston, TX</li>
                </ul>
                <p className="text-xs pt-7 leading-5 text-accent">
                  As ultra influential young entrepreneur - Shelby Leimgruber
                  has succeeded in multiple business facets. From worldwide
                  travel and modeling to negotiating brand deals with high net
                  worth clientele. After
                </p>
              </div>
              <img
                src="https://res.cloudinary.com/ddvaelej7/image/upload/v1655827312/samples/Image_r0ikln.png"
                alt="user"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center lg:px-10 mt-5">
              <div>
                <Link to="#!" className="text-tiger font-semibold text-lg">
                  View
                </Link>
                <h6 className="text-xs font-semibold">Company Handbook</h6>
              </div>
              <div>
                <Link to="#!" className="text-tiger font-semibold text-lg">
                  View
                </Link>
                <h6 className="text-xs font-semibold">Company organogram</h6>
              </div>
              <div>
                <Link to="#!" className="text-tiger font-semibold text-lg">
                  View
                </Link>
                <h6 className="text-xs font-semibold">HMO ID Details</h6>
              </div>
              <div>
                <Link to="#!" className="text-tiger font-semibold text-lg">
                  View
                </Link>
                <h6 className="text-xs font-semibold">ID Number</h6>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl px-5 py-4">
            <h5 className="font-semibold text-accent">Pending Setup</h5>
            <ul className="list-disc px-3 pt-5 text-sm flex flex-col gap-3">
              <li>Manual Guide</li>
              <li>Video Guide</li>
            </ul>
          </div>
        </div>

        {/* HOME CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <HomeCard
            title="Birthdays"
            image={birthDay}
            desc="No Birthday today"
          />
          <HomeCard
            title="Open Tasks"
            image={task}
            desc="No record found"
            subTitle="0 out of 0 results"
          />
          <HomeCard
            title="Work anniversary"
            image={birthDay}
            desc="No work anniversary today"
          />
          <HomeCard
            title="Goals & objectives"
            image={goals}
            desc="You don't have active goals"
            subTitle="0 out of 0 results"
          />
          <HomeCard
            title="Upcoming holidays"
            image={holiday}
            desc="No record found"
            subTitle="0 out of 0 results"
          />
          <HomeCard
            title="Interviews"
            image={interviews}
            desc="No interviews Scheduled"
          />
            <HomeCard
            title="Timesheets"
            image={timesheets}
            desc="No record found"
            subTitle="0 out of 0 results"
          />
            <HomeCard
            title="Attendance"
            image={attendance}
            desc="No record found"
            subTitle="0 out of 0 results"
          />
           <HomeCard
            title="Files"
            image={files}
            desc="No files found"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
