import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Checkbox, Select, Button, HStack, Heading, Table, Thead, Tbody, Tr, Th, Td, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const UnitNames = () => {
  const [unitNames, setUnitNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUnit, setNewUnit] = useState({ code: "", englishName: "", arabicName: "", active: true, linkedUnit: "" });

  const handleNewUnitChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewUnit({
      ...newUnit,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addNewUnit = () => {
    const isDuplicate = unitNames.some((unit) => unit.code === newUnit.code || unit.englishName === newUnit.englishName);
    if (!isDuplicate) {
      setUnitNames([...unitNames, newUnit]);
      setNewUnit({ code: "", englishName: "", arabicName: "", active: true, linkedUnit: "" });
    } else {
      alert("A unit with the same code or English name already exists.");
    }
  };

  return (
    <Box p={4}>
      <Heading mb={6}>Unit Names</Heading>
      <Box mb={6}>
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none">
            <FaSearch />
          </InputLeftElement>
          <Input
            placeholder="Search by code, name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </InputGroup>
      </Box>
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
            {unitNames
              .filter((unit) => unit.code.toLowerCase().includes(searchTerm.toLowerCase()) || unit.englishName.toLowerCase().includes(searchTerm.toLowerCase()) || unit.arabicName.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((unit, index) => {
                // These functions will be modified to handle row-wise editing

                const handleEditUnit = (unitToEdit) => {
                  setNewUnit({ ...unitToEdit, isEditing: true });
                };

                const handleSaveUnit = () => {
                  setUnitNames(
                    unitNames.map((unit) => {
                      if (unit.code === newUnit.code) {
                        return { ...newUnit, isEditing: false };
                      }
                      return unit;
                    }),
                  );
                  setNewUnit({ code: "", englishName: "", arabicName: "", active: true, linkedUnit: "" });
                };

                const handleCancelEdit = () => {
                  setNewUnit({ code: "", englishName: "", arabicName: "", active: true, linkedUnit: "" });
                };

                // This function will be removed as part of the updates

                const handleDeleteUnit = (indexToDelete) => {
                  setUnitNames(unitNames.filter((_, index) => index !== indexToDelete));
                };

                return unit.isEditing ? (
                  <Tr key={index}>
                    <Td>
                      <Input type="text" name="code" value={unit.code} onChange={(e) => setNewUnit({ ...newUnit, code: e.target.value })} />
                    </Td>
                    <Td>
                      <Input type="text" name="englishName" value={unit.englishName} onChange={(e) => setNewUnit({ ...newUnit, englishName: e.target.value })} />
                    </Td>
                    <Td>
                      <Input type="text" name="arabicName" value={unit.arabicName} dir="rtl" onChange={(e) => setNewUnit({ ...newUnit, arabicName: e.target.value })} />
                    </Td>
                    <Td>
                      <Checkbox isChecked={unit.active} name="active" onChange={(e) => setNewUnit({ ...newUnit, active: e.target.checked })}>
                        {unit.active ? "Yes" : "No"}
                      </Checkbox>
                    </Td>
                    <Td>
                      <Input type="text" name="linkedUnit" value={unit.linkedUnit} onChange={(e) => setNewUnit({ ...newUnit, linkedUnit: e.target.value })} />
                    </Td>
                    <Td>
                      <Button colorScheme="green" onClick={() => handleSaveUnit(index)}>
                        Save
                      </Button>
                      <Button colorScheme="red" ml={2} onClick={() => handleCancelEdit(index)}>
                        Cancel
                      </Button>
                    </Td>
                  </Tr>
                ) : (
                  <Tr key={index}>
                    <Td>{unit.code}</Td>
                    <Td>{unit.englishName}</Td>
                    <Td>{unit.arabicName}</Td>
                    <Td>{unit.active ? "Yes" : "No"}</Td>
                    <Td>{unit.linkedUnit}</Td>
                    <Td>
                      <Button colorScheme="blue" onClick={() => handleEditUnit(index)}>
                        Edit
                      </Button>
                      <Button colorScheme="red" ml={2} onClick={() => handleDeleteUnit(index)}>
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default UnitNames;
