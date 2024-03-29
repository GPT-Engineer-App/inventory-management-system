import React, { useState, useEffect } from "react";
import { UnitController } from "../controllers/UnitController";
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, Table, Thead, Tbody, Tr, Th, Td, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const PAGE_SIZE = 5;

const UnitManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const unitController = new UnitController();
  const [units, setUnits] = useState(unitController.units);
  const [newUnit, setNewUnit] = useState(unitController.newUnit);
  const [editMode, setEditMode] = useState(false);
  const [editUnitIndex, setEditUnitIndex] = useState(-1);
  const [editedUnit, setEditedUnit] = useState({});

  const handleUnitChange = (e) => {
    const { name, value } = e.target;
    setNewUnit({ ...newUnit, [name]: value });
  };

  useEffect(() => {
    setUnits(unitController.units);
  }, [unitController.units]);

  const addUnit = () => {
    unitController.addUnit(newUnit);
    setUnits(unitController.units);
    setNewUnit(unitController.newUnit);
  };

  // Remove handleEditUnitClick function

  // Remove handleSaveEdit function

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditUnitIndex(-1);
    setEditedUnit({});
  };

  const handleDeleteUnit = (index) => {
    unitController.deleteUnit(index);
    setUnits(unitController.units);
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Heading>Unit Management</Heading>
        <FormControl>
          <FormLabel>Unit Code</FormLabel>
          <Input placeholder="Enter unit code" name="code" value={newUnit.code} onChange={handleUnitChange} size="md" />
        </FormControl>
        <FormControl>
          <FormLabel>Unit Name</FormLabel>
          <Input placeholder="Enter unit name" name="name" value={newUnit.name} onChange={handleUnitChange} size="md" />
        </FormControl>
        <Button colorScheme="blue" onClick={addUnit}>
          {editMode ? "Save Changes" : "Add Unit"}
        </Button>
        <HStack position="fixed" bottom="0" left="0" right="0" p="5" bg="white" justifyContent="center" spacing={2} boxShadow="lg">
          <Button onClick={() => setCurrentPage(currentPage - 1)} isDisabled={currentPage === 1}>
            Previous
          </Button>
          {[...Array(Math.ceil(units.length / PAGE_SIZE)).keys()].map((pageNum) => (
            <Button key={pageNum} onClick={() => setCurrentPage(pageNum + 1)} colorScheme={currentPage === pageNum + 1 ? "blue" : "gray"}>
              {pageNum + 1}
            </Button>
          ))}
          <Button onClick={() => setCurrentPage(currentPage + 1)} isDisabled={currentPage * PAGE_SIZE >= units.length}>
            Next
          </Button>
        </HStack>
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {units.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((unit, index) => (
              <Tr key={index}>
                <Td>{editMode && editUnitIndex === index ? <Input placeholder="Enter unit code" name="code" value={editedUnit.code} onChange={(e) => setEditedUnit({ ...editedUnit, code: e.target.value })} /> : unit.code}</Td>
                <Td>{editMode && editUnitIndex === index ? <Input placeholder="Enter unit name" name="name" value={editedUnit.name} onChange={(e) => setEditedUnit({ ...editedUnit, name: e.target.value })} /> : unit.name}</Td>
                <Td>
                  {editMode && editUnitIndex === index ? (
                    <>
                      <Button
                        leftIcon={<FaCheck />}
                        colorScheme="green"
                        size="sm"
                        mr={2}
                        onClick={() => {
                          unitController.saveEdit(editUnitIndex, editedUnit);
                          setUnits(unitController.units);
                          setEditMode(false);
                          setEditUnitIndex(-1);
                          setEditedUnit({});
                        }}
                      >
                        Save
                      </Button>
                      <Button leftIcon={<FaTimes />} colorScheme="gray" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      leftIcon={<FaEdit />}
                      colorScheme="yellow"
                      size="sm"
                      mr={2}
                      onClick={() => {
                        setEditMode(true);
                        setEditUnitIndex(index);
                        setEditedUnit(units[index]);
                      }}
                    >
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
