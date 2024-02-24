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
    if (!isDuplicate && !isEmpty) {
      setInventoryItems([...inventoryItems, { ...newItem, isEditing: false }]);
      setNewItem({ storeCode: "", storeName: "", storeAddress: "", storekeeperName: "", storekeeperPhoneNumber: "" });
    } else {
      alert("A store with the same store code already exists.");
    }
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
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
