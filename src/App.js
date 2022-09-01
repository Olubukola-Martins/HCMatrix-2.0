import { BrowserRouter as Router } from "react-router-dom";
import AuthRoutes from "./Auth/Routes/AuthRoutes";
import BillingRoutes from "./Billing/Routes/BillingRoutes";
import PayrollRoutes from "./Payroll/Routes/PayrollRoutes";
// import NotFoundPage from "./Layout/Components/NotFoundPage";
import SettingRoutes from "./Settings/Routes/SettingRoutes";

function App() {
  return (
    <Router>
      <AuthRoutes />

      <SettingRoutes />
      <BillingRoutes />
      <PayrollRoutes />

      {/* <Routes>
      <Route path="*" element={<NotFoundPage /> }/>
      </Routes> */}
    </Router>
  );
}

export default App;
