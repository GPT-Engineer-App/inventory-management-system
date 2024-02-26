import React from "react";
import { Box, VStack, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => (
  <Box w={{ base: "100%", md: "16%" }} p="5" borderWidth="1px" borderColor="gray.200" height="100vh" position={{ base: "relative", md: "fixed" }}>
    <Heading size="md" mb="6">
      Menu
    </Heading>
    <Heading size="sm" mb="4">
      Management
    </Heading>
    <VStack align="stretch" spacing="3">
      <Link as={RouterLink} to="/products" p={2} w="full">
        Products
      </Link>
      <Link as={RouterLink} to="/suppliers" p={2} w="full">
        Suppliers
      </Link>
      <Link as={RouterLink} to="/users" p={2} w="full">
        Users
      </Link>
      <Link as={RouterLink} to="/warehouse-management" p={2} w="full">
        Warehouse Management
      </Link>
      <Link as={RouterLink} to="/unit-management" p={2} w="full">
        Unit Management
      </Link>
    </VStack>
  </Box>
);

export default Sidebar;
