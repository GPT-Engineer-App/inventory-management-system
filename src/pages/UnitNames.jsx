import React from "react";
import { Box, FormControl, FormLabel, Input, Checkbox, Select, Button, VStack, Heading } from "@chakra-ui/react";

const UnitNames = () => {
  return (
    <Box p={4}>
      <Heading mb={6}>Unit Names</Heading>
      <VStack spacing={4}>
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
      </VStack>
    </Box>
  );
};

export default UnitNames;
