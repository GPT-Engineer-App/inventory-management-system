import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Sidebar from "./components/Sidebar";
import { HStack, Button } from "@chakra-ui/react";
import InventoryDashboard from "./pages/InventoryDashboard";
import UnitNames from "./pages/UnitNames.jsx";
import RTLProvider from "./RTLProvider";

// Only a single export of the App function should be present
export default function App() {
  const [isRTL, setIsRTL] = useState(false);

  const toggleRTL = () => setIsRTL(!isRTL);

  const Application = () => (
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
      <Button onClick={toggleRTL} position="fixed" bottom="4" right="4">
        Toggle RTL
      </Button>
    </Router>
  );

  return isRTL ? (
    <RTLProvider>
      <Application />
    </RTLProvider>
  ) : (
    <Application />
  );
}
