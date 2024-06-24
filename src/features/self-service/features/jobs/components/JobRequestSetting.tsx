import PageSubHeader from "components/layout/PageSubHeader";
import { RequisitionPolicyForm } from "../../requisitions/components/RequisitionSetting";

export const JobRequestSetting = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        description={`You can now select the workflow approval for job requisition`}
      />
      <JobRequestPolicy />
    </div>
  );
};

const JobRequestPolicy = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <JobRequestPolicyForm />
    </div>
  );
};

const JobRequestPolicyForm = () => {
  return <RequisitionPolicyForm type="job" />;
};