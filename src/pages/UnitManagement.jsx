import React, { useState } from "react";
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, Table, Thead, Tbody, Tr, Th, Td, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const UnitManagement = () => {
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({ code: "", name: "" });
  const [editMode, setEditMode] = useState(false);
  const [editUnitIndex, setEditUnitIndex] = useState(-1);
  const [editedUnit, setEditedUnit] = useState({});

  const handleUnitChange = (e) => {
    const { name, value } = e.target;
    setNewUnit({ ...newUnit, [name]: value });
  };

  const addUnit = () => {
    if (editMode) {
      setUnits(units.map((unit, index) => (index === editUnitIndex ? editedUnit : unit)));
      setEditMode(false);
    } else {
      setUnits([...units, newUnit]);
    }
    setNewUnit({ code: "", name: "" });
    setEditedUnit({});
  };

  const handleEditUnitClick = (index) => {
    setEditMode(true);
    setEditUnitIndex(index);
    setEditedUnit(units[index]);
  };

  const handleSaveEdit = () => {
    setUnits(units.map((unit, index) => (index === editUnitIndex ? editedUnit : unit)));
    setEditMode(false);
    setEditUnitIndex(-1);
    setEditedUnit({});
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditUnitIndex(-1);
    setEditedUnit({});
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
          {editMode ? "Save Changes" : "Add Unit"}
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
                <Td>{editMode && editUnitIndex === index ? <Input placeholder="Enter unit code" name="code" value={editedUnit.code} onChange={(e) => setEditedUnit({ ...editedUnit, code: e.target.value })} /> : unit.code}</Td>
                <Td>{editMode && editUnitIndex === index ? <Input placeholder="Enter unit name" name="name" value={editedUnit.name} onChange={(e) => setEditedUnit({ ...editedUnit, name: e.target.value })} /> : unit.name}</Td>
                <Td>
                  {editMode && editUnitIndex === index ? (
                    <>
                      <Button leftIcon={<FaCheck />} colorScheme="green" size="sm" mr={2} onClick={handleSaveEdit}>
                        Save
                      </Button>
                      <Button leftIcon={<FaTimes />} colorScheme="gray" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" mr={2} onClick={() => handleEditUnitClick(index)}>
                      Edit
                    </Button>
                  )}
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
