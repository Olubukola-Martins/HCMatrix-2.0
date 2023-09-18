import React from "react";
import RecruitmentSubNav from "../../../components/RecruitmentSubNav";
import { AddJobOpeningContainer } from "../components/AddJobOpeningContainer";

const AddJobOpening = () => {
  return (
    <>
      <RecruitmentSubNav />
      <div className="Container">
        <AddJobOpeningContainer />
      </div>
    </>
  );
};

export default AddJobOpening;