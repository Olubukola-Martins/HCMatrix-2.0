import React, { useState } from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { Link } from "react-router-dom";

const permissionCategories = [
  "all",
  "people analytics",
  "attendance",
  "leave",
  "employee management",
  "settings",
  "audit",
  "project management",
  "dashboard",
  "payroll",
  "loan",
  "document",
  "performance",
  "probation",
  "import",
  "polls",
  "e-learning",
];

const permissions = [
  {
    id: "1",
    category: "people analytics",
    name: "View Hr Reports",
  },
  {
    id: "11",
    category: "people analytics",
    name: "View Attendance Report",
  },
  {
    id: "12",
    category: "people analytics",
    name: "View Leave Report",
  },
  {
    id: "13",
    category: "people analytics",
    name: "Manage Organogram",
  },
  {
    id: "20",
    category: "attendance",
    name: "View Timesheet",
  },
  {
    id: "21",
    category: "attendance",
    name: "View Attendance",
  },
  {
    id: "22",
    category: "attendance",
    name: "Export Timesheet",
  },
  {
    id: "23",
    category: "attendance",
    name: "View Shift Schedules",
  },
  {
    id: "24",
    category: "attendance",
    name: "Approve Schedule Swap",
  },
  {
    id: "30",
    category: "leave",
    name: "Request Leave",
  },
  {
    id: "31",
    category: "leave",
    name: "View Leave Requests",
  },
  {
    id: "32",
    category: "leave",
    name: "Approve Leave Request",
  },
  {
    id: "41",
    category: "employee management",
    name: "Create User",
  },
  {
    id: "42",
    category: "employee management",
    name: "Edit User Basic",
  },
  {
    id: "43",
    category: "employee management",
    name: "Edit User Advanced",
  },
  {
    id: "44",
    category: "employee management",
    name: "Manage User",
  },
  {
    id: "50",
    category: "settings",
    name: "Edit Settings",
  },
  {
    id: "51",
    category: "settings",
    name: "Company Setting",
  },
  {
    id: "52",
    category: "settings",
    name: "Employee Designation Setting",
  },
  {
    id: "53",
    category: "settings",
    name: "Employee Setting",
  },
  {
    id: "54",
    category: "settings",
    name: "Group Access",
  },
  {
    id: "55",
    category: "settings",
    name: "Payroll Setting",
  },
  {
    id: "60",
    category: "audit",
    name: "View Audit Report",
  },
  {
    id: "61",
    category: "audit",
    name: "Export Audit Report",
  },
  {
    id: "71",
    category: "project management",
    name: "Create Project",
  },
  {
    id: "72",
    category: "project management",
    name: "Edit Project",
  },
  {
    id: "73",
    category: "project management",
    name: "Create Task",
  },
  {
    id: "74",
    category: "project management",
    name: "Edit Task",
  },
  {
    id: "75",
    category: "project management",
    name: "Complete Project",
  },
  {
    id: "76",
    category: "project management",
    name: "Complete Task",
  },
  {
    id: "80",
    category: "dashboard",
    name: "Edit Performance",
  },
  {
    id: "81",
    category: "dashboard",
    name: "Attendance Panel",
  },
  {
    id: "82",
    category: "dashboard",
    name: "Attendance Graph",
  },
  {
    id: "83",
    category: "dashboard",
    name: "Request Panel",
  },
  {
    id: "84",
    category: "dashboard",
    name: "Attendance KPI",
  },
  {
    id: "85",
    category: "dashboard",
    name: "Employee KPI",
  },
  {
    id: "86",
    category: "dashboard",
    name: "Finance KPI",
  },

  {
    id: "90",
    category: "payroll",
    name: "Run Payroll",
  },
  {
    id: "91",
    category: "payroll",
    name: "Create Payslip",
  },
  {
    id: "92",
    category: "payroll",
    name: "View Payroll",
  },
  {
    id: "93",
    category: "payroll",
    name: "TMSA Setting",
  },
  {
    id: "a0",
    category: "loan",
    name: "View Loan Requests",
  },
  {
    id: "a1",
    category: "loan",
    name: "Approve Loan Requests",
  },
  {
    id: "a2",
    category: "loan",
    name: "Export Loan Requests",
  },
  {
    id: "b0",
    category: "document",
    name: "View All Document",
  },
  {
    id: "b1",
    category: "document",
    name: "Download Document",
  },
  {
    id: "b2",
    category: "document",
    name: "Move Document",
  },
  {
    id: "b3",
    category: "document",
    name: "Upload Document",
  },
  {
    id: "b4",
    category: "document",
    name: "Upload Own Document",
  },
  {
    id: "b5",
    category: "document",
    name: "Delete Document",
  },
  {
    id: "b6",
    category: "document",
    name: "Rename Folder",
  },
  {
    id: "b7",
    category: "document",
    name: "Add Folder",
  },
  {
    id: "b8",
    category: "document",
    name: "Delete Folder",
  },
  {
    id: "c0",
    category: "performance",
    name: "Add Pilot",
  },
  {
    id: "c1",
    category: "performance",
    name: "Delete Pilot",
  },
  {
    id: "c2",
    category: "performance",
    name: "Publish Pilot",
  },
  {
    id: "c3",
    category: "performance",
    name: "Manage Setting All",
  },
  {
    id: "c4",
    category: "performance",
    name: "Manage Settings Own",
  },
  {
    id: "c5",
    category: "performance",
    name: "Add Hr Comment",
  },
  {
    id: "c6",
    category: "performance",
    name: "Add KPI",
  },
  {
    id: "c7",
    category: "performance",
    name: "Edit KPI",
  },
  {
    id: "c8",
    category: "performance",
    name: "Upload Review Questions",
  },
  {
    id: "c9",
    category: "performance",
    name: "View Review Report",
  },
  {
    id: "c10",
    category: "performance",
    name: "Approve Performance",
  },
  {
    id: "d0",
    category: "probation",
    name: "Manage Probation Policy",
  },
  {
    id: "e1",
    category: "import",
    name: "Manage import",
  },
  {
    id: "f0",
    category: "polls",
    name: "Create Poll",
  },
  {
    id: "f1",
    category: "polls",
    name: "Participate in Poll",
  },
  {
    id: "g0",
    category: "e-learning",
    name: "Issue Query",
  },
  {
    id: "g1",
    category: "e-learning",
    name: "Query Escalation Settings",
  },
  {
    id: "g2",
    category: "e-learning",
    name: "Enroll Users",
  },
  {
    id: "g3",
    category: "e-learning",
    name: "Access E-Learning",
  },
  {
    id: "g4",
    category: "e-learning",
    name: "Access Courses",
  },
  {
    id: "g5",
    category: "e-learning",
    name: "Upload Training Plan",
  },
  {
    id: "g6",
    category: "e-learning",
    name: "Approve Training Plan",
  },
  {
    id: "g7",
    category: "e-learning",
    name: "Upload Training Budget",
  },
];

const Departments = () => {
  const [fPermissions, setFPermissions] = useState(permissions);
  const [category, setCategory] = useState("all");
  const handleSearch = (e) => {
    const val = e.target.value;

    const result = permissions.filter(
      (item) => item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );

    if (val !== "") {
      setFPermissions(() => result);
    } else {
      setFPermissions(permissions);
    }
  };

  const handleClick = (val) => {
    setCategory(val);

    if (val === "all") {
      setFPermissions(permissions);
      return;
    }
    const result = permissions.filter((item) => item.category === val);
    setFPermissions(result);
  };
  return (
    <DashboardLayout>
      <div className="  mt-3 h-screen">
        <div className="bg-card flex justify-between items-center py-2 px-4 rounded-md">
          <div className="flex items-center gap-2 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings/roles">
              <i className="ri-arrow-left-line text-lg cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-sm">Roles</h5>
          </div>
          <div className="flex items-center gap-3">
            <i className="ri-question-fill text-xl text-slate-400"></i>
          </div>
        </div>

        <div className="bg-card mt-5 pt-4 pb-10 px-4 rounded-md">
          <h3 className="text-accent font-bold text-lg mb-4">Create Role </h3>
          <div className="mt-4">
            <form className="text-accent mt-6 grid grid-cols-1 gap-x-24 gap-y-5 w-full">
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Role Name</label>
                  <input
                    type="text"
                    placeholder="eg. Line manager"
                    className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="w-full">
                  <label className="text-base mb-2 block font-semibold">
                    Assign Permissions
                  </label>
                  {/* permission categories */}
                  <div className="flex flex-wrap gap-4 pb-3 border-b ">
                    {permissionCategories.map((item) => (
                      <div className="" key={item}>
                        <button
                          type="button"
                          className={` capitalize hover:bg-caramel hover:border-0 focus:bg-caramel active:bg-caramel text-white block rounded-full text-sm cursor-pointer px-2 py-1 hover:text-white ${
                            item === category
                              ? "bg-caramel"
                              : "bg-transparent border border-slate-400 text-slate-400"
                          }`}
                          onClick={() => handleClick(item)}
                        >
                          {item}
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* permissions */}
                  <div>
                    <div className="flex flex-col gap-2 md:flex-row md:justify-end md:items-center mt-2 p-2 rounded text-sm">
                      <div className="input-container w-1/4">
                        <input
                          onChange={handleSearch}
                          type="text"
                          placeholder="Search permissions"
                          className="w-full bg-transparent rounded-md p-1 border border-gray-400 focus:outline-none "
                        />
                      </div>
                    </div>
                    <div className="my-6 grid grid-cols-4 gap-4">
                      {fPermissions.map((item) => (
                        <label
                          key={item.id}
                          id={item.id}
                          className="flex items-center gap-2 capitalize"
                        >
                          <input type={"checkbox"} id={item.id} />

                          <span className="text-sm">{item.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ctrl btns - edit n delete */}
              <div className="form-buttons flex justify-between mt-2">
                <button className="py-2 px-4 border border-black rounded text-sm hover:opacity-60  font-medium">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Departments;