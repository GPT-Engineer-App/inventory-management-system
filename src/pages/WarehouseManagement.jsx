import React, { useState } from "react";
const PAGE_SIZE = 5;
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button, Table, Thead, Tbody, Tr, Th, Td, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const WarehouseManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [warehouses, setWarehouses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({
    warehouseCode: "",
    warehouseName: "",
    warehouseAddress: "",
    managerName: "",
    managerPhone: "",
    managerEmail: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editWarehouse, setEditWarehouse] = useState({});

  const handleEditWarehouse = (warehouse) => {
    setEditWarehouse(warehouse);
    setIsEditing(true);
  };

  const handleSaveEditedWarehouse = () => {
    setWarehouses(warehouses.map((wh) => (wh.warehouseCode === editWarehouse.warehouseCode ? editWarehouse : wh)));
    setEditWarehouse({});
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditWarehouse({});
    setIsEditing(false);
  };

  const handleWarehouseChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditWarehouse({ ...editWarehouse, [name]: value });
    } else {
      setNewWarehouse({ ...newWarehouse, [name]: value });
    }
  };

  const addWarehouse = () => {
    if (isEditing) {
      handleSaveEditedWarehouse();
    } else {
      if (!newWarehouse.managerName || !newWarehouse.managerPhone || !newWarehouse.managerEmail) {
        alert("Please fill in all the manager fields.");
        return;
      }
      setWarehouses([...warehouses, newWarehouse]);
      setNewWarehouse({
        warehouseCode: "",
        warehouseName: "",
        warehouseAddress: "",
        managerName: "",
        managerPhone: "",
        managerEmail: "",
      });
    }
  };

  const handleDeleteWarehouse = (warehouseCode) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse.warehouseCode !== warehouseCode));
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Heading>Warehouse Management</Heading>

        <FormControl>
          <FormLabel>Warehouse Code</FormLabel>
          <Input placeholder="Enter warehouse code" name="warehouseCode" value={newWarehouse.warehouseCode} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Warehouse Name</FormLabel>
          <Input placeholder="Enter warehouse name" name="warehouseName" value={newWarehouse.warehouseName} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Warehouse Manager Name</FormLabel>
          <Input placeholder="Enter warehouse manager's name" name="managerName" value={newWarehouse.managerName} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Warehouse Manager Phone</FormLabel>
          <Input placeholder="Enter warehouse manager's phone" name="managerPhone" value={newWarehouse.managerPhone} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Warehouse Manager Email</FormLabel>
          <Input placeholder="Enter warehouse manager's email" type="email" name="managerEmail" value={newWarehouse.managerEmail} onChange={handleNewWarehouseChange} />
        </FormControl>
        <Button
          colorScheme="blue"
          onClick={() => {
            if (!newWarehouse.managerName || !newWarehouse.managerPhone || !newWarehouse.managerEmail) {
              alert("Please fill in all the manager fields.");
              return;
            }
            addWarehouse();
          }}
        >
          Add Warehouse
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Manager Name</Th>
              <Th>Manager Phone</Th>
              <Th>Manager Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {warehouses.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((warehouse, index) => (
              <Tr key={index}>
                {isEditing && editWarehouse.warehouseCode === warehouse.warehouseCode ? (
                  <>
                    <Td>
                      <Input value={editWarehouse.warehouseCode} onChange={handleWarehouseChange} name="warehouseCode" />
                    </Td>
                    <Td>
                      <Input value={editWarehouse.warehouseName} onChange={handleWarehouseChange} name="warehouseName" />
                    </Td>
                    <Td>
                      <Input value={editWarehouse.managerName} onChange={handleWarehouseChange} name="managerName" />
                    </Td>
                    <Td>
                      <Input value={editWarehouse.managerPhone} onChange={handleWarehouseChange} name="managerPhone" />
                    </Td>
                    <Td>
                      <Input value={editWarehouse.managerEmail} onChange={handleWarehouseChange} name="managerEmail" />
                    </Td>
                    <Td>
                      <Button leftIcon={<FaEdit />} colorScheme="green" size="sm" mr={2} onClick={handleSaveEditedWarehouse}>
                        Save
                      </Button>
                      <Button leftIcon={<FaTrash />} colorScheme="gray" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </Td>
                  </>
                ) : (
                  <>
                    <Td>{warehouse.warehouseCode}</Td>
                    <Td>{warehouse.warehouseName}</Td>
                    <Td>{warehouse.managerName}</Td>
                    <Td>{warehouse.managerPhone}</Td>
                    <Td>{warehouse.managerEmail}</Td>
                    <Td>
                      <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" mr={2} onClick={() => handleEditWarehouse(warehouse)}>
                        Edit
                      </Button>
                      <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => handleDeleteWarehouse(warehouse.warehouseCode)}>
                        Delete
                      </Button>
                    </Td>
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
      <HStack justifyContent="center" spacing={2} mt="8">
        <Button onClick={() => setCurrentPage(currentPage - 1)} isDisabled={currentPage === 1}>
          Back
        </Button>
        {[...Array(Math.ceil(warehouses.length / PAGE_SIZE)).keys()].map((pageNum) => (
          <Button key={pageNum} onClick={() => setCurrentPage(pageNum + 1)} colorScheme={currentPage === pageNum + 1 ? "blue" : "gray"}>
            {pageNum + 1}
          </Button>
        ))}
        <Button onClick={() => setCurrentPage(currentPage + 1)} isDisabled={currentPage >= Math.ceil(warehouses.length / PAGE_SIZE)}>
          Next
        </Button>
      </HStack>
    </Box>
  );
};
export default WarehouseManagement;
