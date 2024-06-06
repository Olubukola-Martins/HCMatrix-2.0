import PageSubHeader from "components/layout/PageSubHeader";
import { RequisitionPolicyForm } from "../../requisitions/components/RequisitionSetting";

export const ReimbursmentSetting = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        description={`You can now select the workflow approval for reimbursement requisition`}
      />
      <ReimbursementPolicy />
    </div>
  );
};

const ReimbursementPolicy = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <ReimbursementPolicyForm />
    </div>
  );
};

const ReimbursementPolicyForm = () => {
  return <RequisitionPolicyForm type="reimbursement" />;
};
