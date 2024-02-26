import React, { useState } from "react";
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, Table, Thead, Tbody, Tr, Th, Td, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const UnitManagement = () => {
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({ code: "", name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const handleUnitChange = (e) => {
    const { name, value } = e.target;
    setNewUnit({ ...newUnit, [name]: value });
  };

  const addUnit = () => {
    if (isEditing) {
      setUnits(units.map((unit, index) => (index === editIndex ? newUnit : unit)));
      setIsEditing(false);
      setEditIndex(-1);
    } else {
      setUnits([...units, newUnit]);
    }
    setNewUnit({ code: "", name: "" });
  };

  const handleEditUnit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setNewUnit(units[index]);
  };

  const handleDeleteUnit = (index) => {
    setUnits(units.filter((_, idx) => idx !== index));
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Heading>Unit Management</Heading>
        <FormControl>
          <FormLabel>Unit Code</FormLabel>
          <Input placeholder="Enter unit code" name="code" value={newUnit.code} onChange={handleUnitChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Unit Name</FormLabel>
          <Input placeholder="Enter unit name" name="name" value={newUnit.name} onChange={handleUnitChange} />
        </FormControl>
        <Button colorScheme="blue" onClick={addUnit}>
          {isEditing ? "Save Changes" : "Add Unit"}
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {units.map((unit, index) => (
              <Tr key={index}>
                <Td>{unit.code}</Td>
                <Td>{unit.name}</Td>
                <Td>
                  <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" mr={2} onClick={() => handleEditUnit(index)}>
                    Edit
                  </Button>
                  <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => handleDeleteUnit(index)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default UnitManagement;
