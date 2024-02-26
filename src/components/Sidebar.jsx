import React from "react";
import { Box, Flex, Text, VStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => (
  <Box w={{ base: "100%", md: "250px" }} p={5} borderRightWidth="1px" borderColor="gray.200" height="100vh" position="fixed">
    <Flex justify="space-between" align="center" mb={10}>
      <Text fontSize="xl" fontWeight="bold">
        Management
      </Text>
    </Flex>
    <VStack align="stretch" spacing={4}>
      <Link as={RouterLink} to="/products" fontWeight="medium" _hover={{ textDecoration: "none", bg: "gray.100" }} _activeLink={{ fontWeight: "bold", bg: "teal.500", color: "white" }}>
        Products
      </Link>
      <Link as={RouterLink} to="/suppliers" fontWeight="medium" _hover={{ textDecoration: "none", bg: "gray.100" }} _activeLink={{ fontWeight: "bold", bg: "teal.500", color: "white" }}>
        Suppliers
      </Link>
      <Link as={RouterLink} to="/users" fontWeight="medium" _hover={{ textDecoration: "none", bg: "gray.100" }} _activeLink={{ fontWeight: "bold", bg: "teal.500", color: "white" }}>
        Users
      </Link>
      <Link as={RouterLink} to="/warehouse-management" fontWeight="medium" _hover={{ textDecoration: "none", bg: "gray.100" }} _activeLink={{ fontWeight: "bold", bg: "teal.500", color: "white" }}>
        Warehouse Management
      </Link>
      <Link as={RouterLink} to="/unit-management" fontWeight="medium" _hover={{ textDecoration: "none", bg: "gray.100" }} _activeLink={{ fontWeight: "bold", bg: "teal.500", color: "white" }}>
        Unit Management
      </Link>
      <Link as={RouterLink} to="/about" fontWeight="medium" _hover={{ textDecoration: "none", bg: "gray.100" }} _activeLink={{ fontWeight: "bold", bg: "teal.500", color: "white" }}>
        About
      </Link>
    </VStack>
  </Box>
);

export default Sidebar;
