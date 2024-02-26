import React from "react";
import { Box, VStack, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => (
  <Box w={{ base: "100%", md: "20%" }} p="5" borderWidth="1px" borderColor="gray.200" height="100vh" position={{ base: "relative", md: "fixed" }}>
    <Heading size="md" mb="6">
      Menu
    </Heading>
    <VStack align="stretch" spacing="3">
      <Link as={RouterLink} to="/inventory" p={2} w="full" display="block">
        Inventory Dashboard
      </Link>
      <Link as={RouterLink} to="/products" p={2} w="full" display="block">
        Products
      </Link>
      <Link as={RouterLink} to="/suppliers" p={2} w="full" display="block">
        Suppliers
      </Link>
      <Link as={RouterLink} to="/users" p={2} w="full" display="block">
        Users
      </Link>
      <Link as={RouterLink} to="/warehouse-management" p={2} w="full" display="block">
        Warehouse Management
      </Link>
      <Link as={RouterLink} to="/unit-management" p={2} w="full" display="block">
        Unit Management
      </Link>
      <Link as={RouterLink} to="/about" p={2} w="full" display="block">
        About
      </Link>
      <Link as={RouterLink} to="/chat-history" p={2} w="full" display="block">
        Chat History
      </Link>
    </VStack>
  </Box>
);

export default Sidebar;
