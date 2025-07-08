import MaterialRequirement from "./component/Customers/MaterialRequirement";
import OrderTracking from "./component/Orders/OrderTracking";
import Sidebar from "./component/Sidebar/Sidebar";
import MaterialQuotationBoard from "./component/Supplier/MaterialBoard";
import Dashboard from "./Pages/Dashboard";
import Supplier from "./Pages/Supplier";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Sidebar />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route
              path="/supplier/material"
              element={<MaterialQuotationBoard />}
            />
            <Route path="/order/:orderId" element={<OrderTracking />} />
            <Route
              path="/customer/material"
              element={<MaterialRequirement />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
