import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Heading, Text, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaUserCircle, FaStoreAlt } from "react-icons/fa";

const Index = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [newItem, setNewItem] = useState({ storeCode: "", storeName: "", storeAddress: "", storekeeperName: "", storekeeperPhoneNumber: "" });

  const handleNewItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addNewItem = () => {
    const isDuplicate = inventoryItems.some((item) => item.storeCode === newItem.storeCode);
    if (!isDuplicate) {
      setInventoryItems([...inventoryItems, { ...newItem, isEditing: false }]);
      setNewItem({ storeCode: "", storeName: "", storeAddress: "", storekeeperName: "", storekeeperPhoneNumber: "" });
    } else {
      alert("A store with the same store code already exists.");
    }
  };

  const handleEditItem = (index) => {
    setInventoryItems(
      inventoryItems.map((item, idx) => {
        if (idx === index) {
          return { ...item, isEditing: true };
        }
        return item;
      }),
    );
  };

  const handleSaveItem = (index) => {
    setInventoryItems(
      inventoryItems.map((item, idx) => {
        if (idx === index) {
          return { ...item, isEditing: false };
        }
        return item;
      }),
    );
  };

  const handleCancelEdit = (index) => {
    setInventoryItems(
      inventoryItems.map((item, idx) => {
        if (idx === index) {
          return { ...item, isEditing: false };
        }
        return item;
      }),
    );
  };

  const handleDeleteItem = (index) => {
    setInventoryItems(inventoryItems.filter((_, idx) => idx !== index));
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <VStack spacing={4}>
          <Heading>Inventory Management System</Heading>
          <HStack>
            <FaUserCircle size={30} />
            <Text fontWeight="bold">User Role: Manager</Text>
          </HStack>
          <Box w="full" p={4} borderWidth="1px" borderRadius="lg">
            <Heading size="md" mb={4}>
              <FaStoreAlt /> Stores
            </Heading>
            <HStack>
              <FormControl id="storeCode" isRequired>
                <FormLabel>Store Code</FormLabel>
                <Input name="storeCode" value={newItem.storeCode} onChange={handleNewItemChange} />
              </FormControl>
              <FormControl id="storeName" isRequired>
                <FormLabel>Store Name</FormLabel>
                <Input name="storeName" value={newItem.storeName} onChange={handleNewItemChange} />
              </FormControl>
              <FormControl id="storeAddress" isRequired>
                <FormLabel>Store Address</FormLabel>
                <Input name="storeAddress" value={newItem.storeAddress} onChange={handleNewItemChange} />
              </FormControl>
              <FormControl id="storekeeperName" isRequired>
                <FormLabel>Storekeeper's Name</FormLabel>
                <Input name="storekeeperName" value={newItem.storekeeperName} onChange={handleNewItemChange} />
              </FormControl>
              <FormControl id="storekeeperPhoneNumber" isRequired>
                <FormLabel>Storekeeper's Phone Number</FormLabel>
                <Input type="tel" name="storekeeperPhoneNumber" value={newItem.storekeeperPhoneNumber} onChange={handleNewItemChange} />
              </FormControl>
              <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addNewItem}>
                Add Item
              </Button>
            </HStack>
          </Box>
          <Box w="full" p={4} borderWidth="1px" borderRadius="lg">
            <Heading size="md" mb={4}>
              Stores List
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Store Code</Th>
                  <Th>Store Name</Th>
                  <Th>Store Address</Th>
                  <Th>Storekeeper's Name</Th>
                  <Th>Storekeeper's Phone Number</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {inventoryItems.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.storeCode}</Td>
                    <Td>{item.storeName}</Td>
                    <Td>{item.storeAddress}</Td>
                    <Td>{item.storekeeperName}</Td>
                    <Td>{item.storekeeperPhoneNumber}</Td>
                    <Td>
                      <Button colorScheme="blue" mr={2}>
                        Edit
                      </Button>
                      <Button colorScheme="red">Delete</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
