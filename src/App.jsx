import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Sidebar from "./components/Sidebar";
import { HStack } from "@chakra-ui/react";
import InventoryDashboard from "./pages/InventoryDashboard";
import UnitNames from "./pages/UnitNames.jsx";

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
          {/* Additional routes will go here */}
        </Routes>
      </HStack>
    </Router>
  );
}
