import React from "react";
import { Box, Flex, Text, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Sidebar = () => (
  <Box w={{ base: "100%", md: "250px" }} p={5} borderRightWidth="1px" borderColor="gray.200" height="100vh" position="fixed">
    <Flex justify="space-between" align="center" mb={10}>
      <Text fontSize="xl" fontWeight="bold">
        Management
      </Text>
    </Flex>
    <Menu>
      <MenuButton as={IconButton} icon={<FaBars />} variant="outline" aria-label="Options" />
      <MenuList>
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
