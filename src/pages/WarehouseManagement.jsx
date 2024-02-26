import React, { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const WarehouseManagement = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({ code: "", name: "", address: "" });

  const handleNewWarehouseChange = (e) => {
    const { name, value } = e.target;
    setNewWarehouse({ ...newWarehouse, [name]: value });
  };

  const addNewWarehouse = () => {
    const { code, name, address } = newWarehouse;
    if (!code || !name || !address) {
      alert("Please fill in all fields.");
      return;
    }
    setWarehouses([...warehouses, newWarehouse]);
    setNewWarehouse({ code: "", name: "", address: "" });
  };

  const handleDeleteWarehouse = (codeToDelete) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse.code !== codeToDelete));
  };

  return (
    <Box p={4}>
      <Heading mb={6}>Warehouse Management</Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Warehouse Code</FormLabel>
          <Input placeholder="Enter warehouse code" name="code" value={newWarehouse.code} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Warehouse Name</FormLabel>
          <Input placeholder="Enter warehouse name" name="name" value={newWarehouse.name} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Warehouse Address</FormLabel>
          <Input placeholder="Enter warehouse address" name="address" value={newWarehouse.address} onChange={handleNewWarehouseChange} />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addNewWarehouse}>
          Add Warehouse
        </Button>
      </VStack>
      <Table variant="simple" mt={10}>
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Name</Th>
            <Th>Address</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {warehouses.map((warehouse) => (
            <Tr key={warehouse.code}>
              <Td>{warehouse.code}</Td>
              <Td>{warehouse.name}</Td>
              <Td>{warehouse.address}</Td>
              <Td>
                <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" mr={2}>
                  Edit
                </Button>
                <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => handleDeleteWarehouse(warehouse.code)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default WarehouseManagement;
