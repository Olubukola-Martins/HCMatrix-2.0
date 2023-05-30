import React from "react";
import { Link } from "react-router-dom";
import PayrollSubNav from "../components/PayrollSubNav";

const PayrollCycle = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <div className="flex items-center gap-2 mb-10">
          <Link to="/payroll/home" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Payroll Cycle</h5>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Link to="/payroll/create" className="button">
            Create Payroll
          </Link>
          <div className="flex justify-end gap-5 font-medium">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>

            <button className="border border-red-400 rounded px-2 py-1 font-medium text-accent text-sm">
              Filter
            </button>
          </div>
        </div>

        <table className="payroll-table text-accent">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="" id="" />
              </th>
              <th>Pay Date</th>
              <th>Pay Type</th>
              <th>Net Pay</th>
              <th>Gross Pay</th>
              <th>Deduction</th>
              <th>Bonuses</th>
              <th>Tax</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>

                <td>DD/MM/YY</td>
                <td>Salary</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>Fixed</td>
                <td>Fixed</td>
                <td>N0.00</td>
                <td className="text-caramel text-xs">Closed</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PayrollCycle;