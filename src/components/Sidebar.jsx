import React from "react";
import { Box, VStack, Link, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box w="20%" p="5" borderWidth="1px" borderColor="gray.200">
      <Heading size="md" mb="6">
        Menu
      </Heading>
      <VStack align="stretch" spacing="3">
        <Link as={RouterLink} to="/">
          Stores
        </Link>
        <Link as={RouterLink} to="/inventory">
          Inventory
        </Link>
        <Link as={RouterLink} to="/transactions">
          Transactions
        </Link>
        <Link as={RouterLink} to="/inventory-dashboard">
          Inventory Dashboard
        </Link>
        <Link as={RouterLink} to="/users">
          Users
        </Link>
        <Link as={RouterLink} to="/unit-names">
          Unit Names
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
