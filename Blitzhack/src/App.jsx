import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MaterialRequirement from "./component/Customers/MaterialRequirement";
import OrderTracking from "./component/Orders/OrderTracking";
import Sidebar from "./component/Sidebar/Sidebar";
import MaterialQuotationBoard from "./component/Supplier/MaterialBoard";
import MaterialSupplierHistory from "./component/Supplier/MaterialHistory";
import AnalyticsDashboard from "./Pages/Analytics";
import Dashboard from "./Pages/Dashboard";
import Supplier from "./Pages/Supplier";
import ProfilePage from "./Pages/Profilepage";
import GlassProductionDashboard from "./component/Trackings/ProductionM";
import ProductionPlannerDashboard from "./Pages/ProductionPlannerDashboard";

function ProtectedLayout() {
  const user = localStorage.getItem("user");
  return user ? (
    <>
      <Sidebar />
      {/* <Outlet /> */}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

function HomePageRouter() {
  const user_data = JSON.parse(localStorage.getItem("user"));
  const userRole = user_data?.role || "";

  if (!user_data) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === "production_manager") {
    return <ProductionPlannerDashboard />;
  }

  return <Dashboard />;
}

function App() {
  const user_data = JSON.parse(localStorage.getItem("user"));
  const userRole = user_data?.role || "";
  console.log(userRole);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePageRouter />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route
            path="/supplier/material"
            element={<MaterialQuotationBoard />}
          />
          <Route
            path="/supplier/material_history"
            element={<MaterialSupplierHistory />}
          />
          <Route
            path="/production_manager"
            element={<GlassProductionDashboard />}
          />
          <Route path="/order/:orderId" element={<OrderTracking />} />
          <Route path="/customer/material" element={<MaterialRequirement />} />
          <Route
            path="/user_supplier/analytics"
            element={<AnalyticsDashboard />}
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
