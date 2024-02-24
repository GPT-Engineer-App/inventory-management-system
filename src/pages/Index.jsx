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
    const { storeCode, storeName, storeAddress, storekeeperName, storekeeperPhoneNumber } = newItem;
    const isDuplicate = inventoryItems.some((item) => item.storeCode === storeCode);
    const isEmpty = !storeCode || !storeName || !storeAddress || !storekeeperName || !storekeeperPhoneNumber;
    if (isEmpty) {
      alert("Please fill in all fields.");
      return;
    }
    if (isDuplicate) {
      alert("A store with the same store code already exists.");
      return;
    }
    setInventoryItems([...inventoryItems, { ...newItem }]);
    setNewItem({ storeCode: "", storeName: "", storeAddress: "", storekeeperName: "", storekeeperPhoneNumber: "" });
  };

  const handleEditItem = (indexToEdit) => {
    setInventoryItems(
      inventoryItems.map((item, idx) => ({
        ...item,
        isEditing: idx === indexToEdit,
      })),
    );
  };

  const handleSaveItem = (indexToSave) => {
    setInventoryItems(
      inventoryItems.map((item, idx) => {
        if (idx === indexToSave) {
          return {
            ...item,
            storeCode: newItem.storeCode,
            storeName: newItem.storeName,
            storeAddress: newItem.storeAddress,
            storekeeperName: newItem.storekeeperName,
            storekeeperPhoneNumber: newItem.storekeeperPhoneNumber,
            isEditing: false,
          };
        }
        return item;
      }),
    );
    setNewItem({ storeCode: "", storeName: "", storeAddress: "", storekeeperName: "", storekeeperPhoneNumber: "" });
  };

  const handleCancelEdit = () => {
    setInventoryItems(inventoryItems.map((item) => ({ ...item, isEditing: false })));
  };

  const handleDeleteItem = (indexToDelete) => {
    setInventoryItems(inventoryItems.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <VStack spacing={4}>
          <Heading>Inventory Management System</Heading>
          <HStack>
            <FaUserCircle size={30} />
            <Text fontWeight="extrabold">User Role: Manager</Text>
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
                    <Td>{item.isEditing ? <Input name="storeCode" value={newItem.storeCode} onChange={handleNewItemChange} /> : item.storeCode}</Td>
                    <Td>{item.isEditing ? <Input name="storeName" value={newItem.storeName} onChange={handleNewItemChange} /> : item.storeName}</Td>
                    <Td>{item.isEditing ? <Input name="storeAddress" value={newItem.storeAddress} onChange={handleNewItemChange} /> : item.storeAddress}</Td>
                    <Td>{item.isEditing ? <Input name="storekeeperName" value={newItem.storekeeperName} onChange={handleNewItemChange} /> : item.storekeeperName}</Td>
                    <Td>{item.isEditing ? <Input type="tel" name="storekeeperPhoneNumber" value={newItem.storekeeperPhoneNumber} onChange={handleNewItemChange} /> : item.storekeeperPhoneNumber}</Td>
                    <Td>
                      {item.isEditing ? (
                        <>
                          <Button colorScheme="green" mr={2} onClick={() => handleSaveItem(index)}>
                            Save
                          </Button>
                          <Button colorScheme="yellow" onClick={() => handleCancelEdit(index)}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button colorScheme="blue" mr={2} onClick={() => handleEditItem(index)}>
                            Edit
                          </Button>
                          <Button colorScheme="red" onClick={() => handleDeleteItem(index)}>
                            Delete
                          </Button>
                        </>
                      )}
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
