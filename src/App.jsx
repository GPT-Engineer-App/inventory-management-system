import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { HStack } from "@chakra-ui/react";
import UserManagement from "./pages/UserManagement.jsx";

// Only a single export of the App function should be present
export default function App() {
  return (
    <Router>
      <HStack spacing={0} align="start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<UserManagement />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </HStack>
    </Router>
  );
}
