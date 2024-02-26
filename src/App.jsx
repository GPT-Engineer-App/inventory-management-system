import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Sidebar from "./components/Sidebar";
import { HStack } from "@chakra-ui/react";
import InventoryDashboard from "./pages/InventoryDashboard";
import UnitNames from "./pages/UnitNames.jsx";
import ProductManagement from "./pages/ProductManagement.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import WarehouseManagement from "./pages/WarehouseManagement.jsx";

// Only a single export of the App function should be present
export default function App() {
  return (
    <Router>
      <HStack spacing={0} align="start">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/inventory" element={<InventoryDashboard />} />
          <Route path="/unit-names" element={<UnitNames />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/unit-names" element={<UnitNames />} />
        </Routes>
      </HStack>
    </Router>
  );
}
