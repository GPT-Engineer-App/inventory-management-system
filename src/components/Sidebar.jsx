import React from "react";
import { Box, VStack, Heading, Menu, MenuButton, MenuList, MenuItem, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box w="20%" p="5" borderWidth="1px" borderColor="gray.200">
      <Heading size="md" mb="6">
        Menu
      </Heading>
      <VStack align="stretch" spacing="3">
        <MenuItem as={RouterLink} to="/inventory">
          Inventory Dashboard
        </MenuItem>
        <MenuItem as={RouterLink} to="/products">
          Products
        </MenuItem>
        <MenuItem as={RouterLink} to="/suppliers">
          Suppliers
        </MenuItem>
        <MenuItem as={RouterLink} to="/users">
          Users
        </MenuItem>
        <MenuItem as={RouterLink} to="/warehouse-management">
          Warehouse Management
        </MenuItem>
        <MenuItem as={RouterLink} to="/unit-management">
          Unit Management
        </MenuItem>
        <MenuItem as={RouterLink} to="/inventory">
          Inventory Dashboard
        </MenuItem>
        <MenuItem as={RouterLink} to="/products">
          Products
        </MenuItem>
        <MenuItem as={RouterLink} to="/suppliers">
          Suppliers
        </MenuItem>
        <MenuItem as={RouterLink} to="/users">
          Users
        </MenuItem>
        <MenuItem as={RouterLink} to="/warehouse-management">
          Warehouse Management
        </MenuItem>
        <MenuItem as={RouterLink} to="/unit-management">
          Unit Management
        </MenuItem>
        <MenuItem as={RouterLink} to="/about">
          About
        </MenuItem>
        <MenuItem as={RouterLink} to="/chat-history">
          Chat History
        </MenuItem>
      </VStack>
    </Box>
  );
};

export default Sidebar;
