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
        <Menu>
          <MenuButton as={Link}>Basic Definitions</MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/">
              User Management
            </MenuItem>
            <MenuItem as={RouterLink} to="/users">
              User Management
            </MenuItem>
          </MenuList>
        </Menu>
      </VStack>
    </Box>
  );
};

export default Sidebar;
