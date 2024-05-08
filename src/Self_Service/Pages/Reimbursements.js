import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import NewReimbursement from "../Components/Reimbursements/NewReimbursement";
import ReimbursementDetails from "../Components/Reimbursements/ReimbursementDetails";
import SelfServiceSubNav from "../Components/SelfServiceSubNav";

const Reimbursements = () => {
  const [newReimbursement, setReimbursementModal] = useState(false);
  const [reimbursementDetailModal, setReimbursementDetailModal] = useState(false);

  return (
    <DashboardLayout>
          <SelfServiceSubNav/>
      {/* modal components */}
      <NewReimbursement
        open={newReimbursement}
        handleClose={() => setReimbursementModal(false)}
      />
      <ReimbursementDetails
        open={reimbursementDetailModal}
        handleClose={() => setReimbursementDetailModal(false)}
      />

      <div className="Container">
        <div className="flex items-center gap-2">
          <Link to="/self-service/home" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Reimbursements</h5>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0 justify-start md:justify-end">
          <i className="ri-download-2-line text-xl cursor-pointer"></i>
          <i className="fa-solid fa-file-export cursor-pointer"></i>
          <button
            className="button"
            onClick={() => setReimbursementModal(true)}
          >
            New Reimbursements
          </button>
        </div>
        <table className="payroll-table text-accent mt-6">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Date</th>
              <th>Type</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>DD/MM/YY</td>
                <td> Transportation</td>
                <td>Uber Fare</td>
                <td>N0.00</td>
                <td>Pending</td>
                <td className="flex items-center justify-center gap-3">
                  <i
                    onClick={() => setReimbursementDetailModal(true)}
                    className="ri-eye-line text-lg cursor-pointer hover:text-caramel"
                  ></i>
                  <i className="ri-download-2-line text-lg"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Reimbursements;