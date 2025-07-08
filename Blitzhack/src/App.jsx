import OrderTracking from "./component/Orders/OrderTracking";
import Sidebar from "./component/Sidebar/Sidebar";
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
            <Route path="/order/:orderId" element={<OrderTracking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
