import React, { useState } from "react";
import { Box, VStack, Heading, Text, FormControl, FormLabel, Input, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const WarehouseManagement = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({
    warehouseCode: "",
    warehouseName: "",
    warehouseAddress: "",
  });

  const handleNewWarehouseChange = (e) => {
    setNewWarehouse({ ...newWarehouse, [e.target.name]: e.target.value });
  };

  const addWarehouse = () => {
    setWarehouses([...warehouses, newWarehouse]);
    setNewWarehouse({ warehouseCode: "", warehouseName: "", warehouseAddress: "" });
  };

  const handleDeleteWarehouse = (warehouseCode) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse.warehouseCode !== warehouseCode));
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Heading>Welcome to the Warehouse Management page. Here you can manage all warehouse-related activities.</Heading>

        <FormControl>
          <FormLabel>Warehouse Code</FormLabel>
          <Input placeholder="Enter warehouse code" name="warehouseCode" value={newWarehouse.warehouseCode} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Warehouse Name</FormLabel>
          <Input placeholder="Enter warehouse name" name="warehouseName" value={newWarehouse.warehouseName} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Warehouse Address</FormLabel>
          <Input placeholder="Enter warehouse address" name="warehouseAddress" value={newWarehouse.warehouseAddress} onChange={handleNewWarehouseChange} />
        </FormControl>
        <Button colorScheme="blue" onClick={addWarehouse}>
          Add Warehouse
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {warehouses.map((warehouse, index) => (
              <Tr key={index}>
                <Td>{warehouse.warehouseCode}</Td>
                <Td>{warehouse.warehouseName}</Td>
                <Td>{warehouse.warehouseAddress}</Td>
                <Td>
                  <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" mr={2}>
                    Edit
                  </Button>
                  <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => handleDeleteWarehouse(warehouse.warehouseCode)}>
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

export default WarehouseManagement;
