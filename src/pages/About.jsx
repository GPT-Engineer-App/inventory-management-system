import React from "react";
import { Box, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Box p={5}>
      <Text fontSize="xl">About the Application</Text>
      <Text>This application is designed to manage inventory, products, suppliers, users, warehouses, and units within a company. The purpose is to streamline operations and keep track of all the important components of product management and distribution.</Text>
    </Box>
  );
};

export default About;
