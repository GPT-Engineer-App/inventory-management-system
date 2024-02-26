import React from "react";
import { Box, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => (
  <Box w={{ base: "100%", md: "16%" }} p="5" borderWidth="1px" borderColor="gray.200" height="100vh" position={{ base: "relative", md: "fixed" }}>
    <Heading size="md" mb="6">
      Menu
    </Heading>
    <Heading size="sm" mb="4">
      Management
    </Heading>
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Management
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Link as={RouterLink} to="/products" d="block" my="2">
            Products
          </Link>
          <Link as={RouterLink} to="/suppliers" d="block" my="2">
            Suppliers
          </Link>
          <Link as={RouterLink} to="/users" d="block" my="2">
            Users
          </Link>
          <Link as={RouterLink} to="/warehouse-management" d="block" my="2">
            Warehouse Management
          </Link>
          <Link as={RouterLink} to="/unit-management" d="block" my="2">
            Unit Management
          </Link>
          <Link as={RouterLink} to="/about" d="block" my="2">
            About
          </Link>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Box>
);

export default Sidebar;
