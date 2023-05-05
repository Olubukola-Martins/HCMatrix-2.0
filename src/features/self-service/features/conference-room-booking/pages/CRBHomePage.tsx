import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import CRBCards from "../components/CRBCards";
import CRBHeader from "../components/CRBHeader";
import CRBHistoryTable from "../components/CRBHistoryTable";
import CRBMyRequestsTable from "../components/CRBMyRequestsTable";

export const CRBHomePage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div>
        <div className="Container">
          <CRBHeader title="Meeting Room Booking" />
          <CRBCards />
          <div className="mt-12 flex flex-col gap-4">
            <CRBMyRequestsTable />
            <CRBHistoryTable />
          </div>
        </div>
      </div>
    </>
  );
};
