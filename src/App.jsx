import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import { Flex, Box } from "@chakra-ui/react";
import InventoryDashboard from "./pages/InventoryDashboard";
import UnitNames from "./pages/UnitNames.jsx";
import ProductManagement from "./pages/ProductManagement.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import WarehouseManagement from "./pages/WarehouseManagement.jsx";
import UnitManagement from "./pages/UnitManagement";
import ChatHistory from "./pages/ChatHistory";

// Only a single export of the App function should be present
export default function App() {
  return (
    <Router>
      <Flex>
        <Sidebar w="250px" />
        <Box flex="1" pl="250px">
          {" "}
          {/* Adjust left padding to account for the sidebar width */}
          <Routes>
            <Route path="/inventory" element={<InventoryDashboard />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/warehouse-management" element={<WarehouseManagement />} />
            <Route path="/unit-management" element={<UnitManagement />} />
            <Route path="/about" element={<About />} />
            <Route path="/chat-history" element={<ChatHistory />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
}
