import React from "react";
import { Box, FormControl, FormLabel, Input, Checkbox, Select, Button, HStack, Heading } from "@chakra-ui/react";

const UnitNames = () => {
  return (
    <Box p={4}>
      <Heading mb={6}>Unit Names</Heading>
      <HStack spacing={4} align="start">
        <FormControl id="code">
          <FormLabel>Code</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="englishName">
          <FormLabel>English Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="arabicName">
          <FormLabel>Arabic Name</FormLabel>
          <Input type="text" dir="rtl" />
        </FormControl>
        <FormControl id="active">
          <Checkbox defaultChecked>Active</Checkbox>
        </FormControl>
        <FormControl id="linkedUnit">
          <FormLabel>Linked to a unit</FormLabel>
          <Select placeholder="Select option">{/* Options should be populated dynamically */}</Select>
        </FormControl>
        <Button colorScheme="blue">Submit</Button>
      </HStack>
    </Box>
  );
};

export default UnitNames;
