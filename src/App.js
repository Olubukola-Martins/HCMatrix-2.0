import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./Administration/Routes/AdminRoutes";
import AuthRoutes from "./Auth/Routes/AuthRoutes";
import BillingRoutes from "./Billing/Routes/BillingRoutes";
import PayrollRoutes from "./Payroll/Routes/PayrollRoutes";
import SelfServiceRoutes from "./Self_Service/Routes/SelfServiceRoutes";
// import NotFoundPage from "./Layout/Components/NotFoundPage";
import SettingRoutes from "./Settings/Routes/SettingRoutes";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import HomeRoute from "./Home/HomeRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthRoutes />
        <HomeRoute/>
        <SettingRoutes />
        <BillingRoutes />
        <PayrollRoutes />
        <AdminRoutes />
        <SelfServiceRoutes />

        {/* <Routes>
      <Route path="*" element={<NotFoundPage /> }/>
      </Routes> */}
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
