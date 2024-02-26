import React from "react";
import { Box, Heading, Link, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Sidebar = () => (
  <Box w={{ base: "100%", md: "16%" }} p="5" borderWidth="1px" borderColor="gray.200" height="100vh" position={{ base: "relative", md: "fixed" }}>
    <Heading size="md" mb="6">
      Menu
    </Heading>
    <Heading size="sm" mb="4">
      Management
    </Heading>
    <Menu>
      <MenuButton as={IconButton} aria-label="Options" icon={<FaChevronDown />} variant="outline" w="full" />
      <MenuList placement="right-start">
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
      </MenuList>
    </Menu>
  </Box>
);

export default Sidebar;
