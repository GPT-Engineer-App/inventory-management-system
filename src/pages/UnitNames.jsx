import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Checkbox, Select, Button, HStack, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const UnitNames = () => {
  const [unitNames, setUnitNames] = useState([]);
  const [newUnit, setNewUnit] = useState({ code: "", englishName: "", arabicName: "", active: true, linkedUnit: "" });

  const handleNewUnitChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewUnit({
      ...newUnit,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addNewUnit = () => {
    setUnitNames([...unitNames, newUnit]);
    setNewUnit({ code: "", englishName: "", arabicName: "", active: true, linkedUnit: "" });
  };

  return (
    <Box p={4}>
      <Heading mb={6}>Unit Names</Heading>
      <HStack
        spacing={4}
        as="form"
        align="start"
        onSubmit={(e) => {
          e.preventDefault();
          addNewUnit();
        }}
      >
        <FormControl id="code" isRequired>
          <FormLabel>Code</FormLabel>
          <Input type="text" name="code" value={newUnit.code} onChange={handleNewUnitChange} />
        </FormControl>
        <FormControl id="englishName" isRequired>
          <FormLabel>English Name</FormLabel>
          <Input type="text" name="englishName" value={newUnit.englishName} onChange={handleNewUnitChange} />
        </FormControl>
        <FormControl id="arabicName" isRequired>
          <FormLabel>Arabic Name</FormLabel>
          <Input type="text" name="arabicName" value={newUnit.arabicName} onChange={handleNewUnitChange} dir="rtl" />
        </FormControl>
        <FormControl id="active" isRequired>
          <FormLabel>Active</FormLabel>
          <Select name="active" value={newUnit.active ? "active" : "notActive"} onChange={handleNewUnitChange}>
            <option value="active">Active</option>
            <option value="notActive">Not Active</option>
          </Select>
        </FormControl>
        <FormControl id="linkedUnit">
          <FormLabel>Linked to a unit</FormLabel>
          <Select name="linkedUnit" value={newUnit.linkedUnit} onChange={handleNewUnitChange} placeholder="Select option">
            {/* Options should be populated dynamically */}
          </Select>
        </FormControl>
        <Button colorScheme="blue" type="submit">
          Add
        </Button>
      </HStack>
      {/* Unit Names list section */}
      <Box mt={10}>
        <Heading size="md" mb={4}>
          Unit Names List
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>English Name</Th>
              <Th>Arabic Name</Th>
              <Th>Active</Th>
              <Th>Linked Unit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {unitNames.map((unit, index) => (
              <Tr key={index}>
                <Td>{unit.code}</Td>
                <Td>{unit.englishName}</Td>
                <Td>{unit.arabicName}</Td>
                <Td>{unit.active ? "Yes" : "No"}</Td>
                <Td>{unit.linkedUnit}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default UnitNames;
